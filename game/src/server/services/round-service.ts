import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { Events } from "server/network";
import { producer } from "server/store";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { noEnemiesExist } from "shared/store/enemy";
import { getMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 3_000;
const ROUND_BONUS = 750;
const ROUND_BONUS_MULTIPLIER = 2;

function getRoundBonusForRound(round: number, initialRoundBonus: number, roundBonusMultiplier: number): number {
	const additionalBonusMultiplier = roundBonusMultiplier - 1;
	const totalRoundBonusMultiplier = 1 + (round - 1) * additionalBonusMultiplier;

	const roundBonus = math.floor(initialRoundBonus * totalRoundBonusMultiplier);

	return roundBonus;
}

interface Group {
	enemyType: EnemyType;
	count: number;
	enemySpawnInterval: number;
	delayToNextGroup: number;
}

type Round = Group[];

type Level = Round[];

const level: Level = [
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 3,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 7,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 5,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 5,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 4,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 7,
			enemySpawnInterval: 1_500,
			delayToNextGroup: 0,
		},
		{
			enemyType: "TRAINING_DUMMY",
			count: 2,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 12,
			enemySpawnInterval: 1_500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 2,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 7,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 9,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 16,
			enemySpawnInterval: 250,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 5,
			enemySpawnInterval: 125,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 8,
			enemySpawnInterval: 500,
			delayToNextGroup: 5_000,
		},
		{
			enemyType: "DUMMY_TANK",
			count: 1,
			enemySpawnInterval: 0,
			delayToNextGroup: 0,
		},
	],
];

type RoundResult =
	| {
			type: "success";
	  }
	| {
			type: "error";
			message: string;
	  };

@Service({})
export class RoundService implements OnStart {
	onStart() {
		holdFor(10_000);

		Events.setDialog.broadcast("Welcome to the tutorial!", 6_000);
		holdFor(5_000);
		Events.setDialog.broadcast(
			"Click on the tower button at the bottom, and move the tower to a location where its blue circle reaches the path",
			6_000,
		);
		holdFor(5_000);

		for (let roundIndex = 0; roundIndex < level.size(); roundIndex++) {
			const round = level[roundIndex];
			const roundNumber = roundIndex + 1;

			switch (roundNumber) {
				case 1: {
					Events.setDialog.broadcast("Click / tap on a tower to upgrade it!", 10_000);
					break;
				}
				case 2: {
					Events.setDialog.broadcast("I saw some quicker enemies in the distance, be prepared!", 10_000);
					break;
				}
				case 4: {
					Events.setDialog.broadcast(
						"Armored enemies are on the way! They have the 'reinforced' immunity, meaning that towers without the corresponding trait cannot attack them! Upgrade Archer to level 2 to take them out!",
						10_000,
					);
					break;
				}
				case 6: {
					Events.setDialog.broadcast(
						"Stealth enemies are coming! They are invisible to towers without the 'stealth' trait! Archer gains this trait with its level 3 upgrade!",
						10_000,
					);
					break;
				}
				case 8: {
					Events.setDialog.broadcast("Loud thuds in the distance? I don't like what I'm hearing...", 10_000);
					break;
				}
				case 9: {
					Events.setDialog.broadcast(
						"THE DUMMY TANK HAS ARRIVED! It's slow, but it has a LOT of health. If he gets through the range of your towers, sell and rebuy them in a different location!",
						10_000,
					);
					break;
				}
			}

			const roundBonus = getRoundBonusForRound(roundNumber, ROUND_BONUS, ROUND_BONUS_MULTIPLIER);

			let roundCompleted = false;

			this.spawnRound(round).finally(() => {
				producer.awardBonusToAll(roundBonus);
				roundCompleted = true;
			});

			while (!roundCompleted) {
				RunService.Heartbeat.Wait();
			}

			holdFor(INTERVAL_BETWEEN_ROUNDS_MILLISECONDS);
		}
	}

	private async spawnRound(round: Round): Promise<RoundResult> {
		const path = producer.getState(getMap).path;

		for (const group of round) {
			for (let i = 0; i < group.count; i++) {
				const enemy = createEnemy(group.enemyType, path);
				producer.addEnemy(enemy, createId());

				holdFor(group.enemySpawnInterval);
			}

			holdFor(group.delayToNextGroup);
		}

		let roundEnded = false;

		producer.once(noEnemiesExist, () => {
			roundEnded = true;
		});

		while (!roundEnded) {
			RunService.Heartbeat.Wait();
		}

		return { type: "success" };
	}
}
