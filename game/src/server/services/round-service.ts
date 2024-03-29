import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { tracks } from "shared/modules/music/tracks";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { selectNoEnemiesExist } from "shared/store/enemy";
import { selectGameOver, selectMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 0;
const ROUND_BONUS = 500;
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
			count: 4,
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
			count: 5,
			enemySpawnInterval: 500,
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
			enemySpawnInterval: 500,
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
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
		{
			enemyType: "TRAINING_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
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
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 9,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 5,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 1,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 20,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 8,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 10,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 3_000,
		},
		{
			enemyType: "GUARD_DUMMY",
			count: 5,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 15,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 15,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 15,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 15,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 3_000,
		},
		{
			enemyType: "GUARD_DUMMY",
			count: 5,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 3_000,
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
		producer.subscribe(selectGameOver, (gameOver) => {
			if (!gameOver) return;
			producer.clearEnemies();
		});

		producer.setTrackId(tracks.chill_jazz);

		holdFor(10_000);

		producer.setDialog("Welcome to the tutorial!");
		holdFor(10_000);
		producer.setDialog(
			"Click on the tower button at the bottom, and move the tower to a location where its gray circle reaches the path, then click again to place it!",
		);
		holdFor(10_000);
		producer.setDialog("Click on a tower to upgrade it!");
		holdFor(10_000);

		for (let roundIndex = 0; roundIndex < level.size(); roundIndex++) {
			const round = level[roundIndex];
			const roundNumber = roundIndex + 1;

			switch (roundNumber) {
				case 1: {
					producer.setTrackId(tracks.techno);
					producer.setDialog(
						"You will gain money for each enemy you defeat. Use it to build more towers, or upgrade existing ones!",
					);
					break;
				}
				case 2: {
					producer.setDialog("I saw some quicker enemies in the distance, be prepared!");
					break;
				}
				case 4: {
					producer.setDialog(
						"Armored enemies are on the way; they're really strong, so upgrading or placing more Archers is essential.",
					);
					break;
				}
				case 6: {
					producer.setDialog(
						"Stealth enemies are coming! They are invisible to towers without the 'stealth' trait! Archer gains this trait with its level 3 upgrade!",
					);
					break;
				}
				case 8: {
					producer.setDialog(
						"Multipliers are coming! They will turn into more enemies when they are killed! We need lots of defense to take them down. Stay vigilant!",
					);
					break;
				}
				case 10: {
					producer.setDialog(
						"Loud thuds in the distance? I don't like what I'm hearing... Reinforced enemies coming next round. Make sure your Archers are level 2 or higher to counter them!",
					);
					break;
				}
				case 11: {
					producer.setDialog(
						"Who are they? Are they protecting something? Just kidding. I know everything, I am the narrator, you will just have to find out.",
					);
					break;
				}
				case 12: {
					producer.setTrackId(tracks.light_show);
					producer.setDialog(
						"The Dummy Tank is here! It has a lot of health, but it is very slow! Good luck taking it down.",
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

			const gameOver = producer.getState(selectGameOver);
			if (gameOver) break;

			holdFor(INTERVAL_BETWEEN_ROUNDS_MILLISECONDS);

			if (roundNumber === 12) {
				producer.setDialog("You have completed the tutorial! Congratulations!");
				producer.setTrackId(tracks.victory);
			}
		}
	}

	private async spawnRound(round: Round): Promise<RoundResult> {
		const path = producer.getState(selectMap).path;

		for (const group of round) {
			for (let i = 0; i < group.count; i++) {
				const gameOver = producer.getState(selectGameOver);
				if (gameOver) return { type: "error", message: "Game over - cancelling round" };

				const enemy = createEnemy(group.enemyType, path);
				producer.addEnemy(enemy, createId());

				holdFor(group.enemySpawnInterval);
			}

			holdFor(group.delayToNextGroup);
		}

		let roundEnded = false;

		while (!roundEnded) {
			RunService.Heartbeat.Wait();

			roundEnded = producer.getState(selectNoEnemiesExist);
		}

		return { type: "success" };
	}
}
