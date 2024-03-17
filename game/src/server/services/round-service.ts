import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { noEnemiesExist } from "shared/store/enemy";
import { getMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 3_000;
const ROUND_BONUS = 500;
const ROUND_BONUS_MULTIPLIER = 1.25;

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

const level1: Level = [
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 4,
			enemySpawnInterval: 500,
			delayToNextGroup: 1500,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 4,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 8,
			enemySpawnInterval: 500,
			delayToNextGroup: 3000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 4,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 3,
			enemySpawnInterval: 1000,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 5,
			enemySpawnInterval: 250,
			delayToNextGroup: 250,
		},
		{
			enemyType: "TRAINING_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 9,
			enemySpawnInterval: 750,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 2,
			enemySpawnInterval: 250,
			delayToNextGroup: 250,
		},
		{
			enemyType: "TRAINING_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 18,
			enemySpawnInterval: 1250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 3,
			enemySpawnInterval: 1250,
			delayToNextGroup: 250,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 500,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 5,
			enemySpawnInterval: 250,
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
		task.wait(10);

		for (let roundIndex = 0; roundIndex < level1.size(); roundIndex++) {
			const round = level1[roundIndex];
			const roundNumber = roundIndex + 1;

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
