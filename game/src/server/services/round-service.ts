import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { noEnemiesExist } from "shared/store/enemy";
import { getMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 500;
const ROUND_BONUS = 300;
const ROUND_BONUS_MULTIPLIER = 1.5;

function getRoundBonusForRound(round: number, initialRoundBonus: number, roundBonusMultiplier: number) {
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
			count: 6,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 10,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 9,
			enemySpawnInterval: 500,
			delayToNextGroup: 1500,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 3,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 6,
			enemySpawnInterval: 500,
			delayToNextGroup: 3000,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 12,
			enemySpawnInterval: 1000,
			delayToNextGroup: 0,
		},
	],
	// essentially infinite round of strong dummies for testing
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 1_000,
			enemySpawnInterval: 1000,
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

		this.spawnRound(level1[0]).await();
		producer.awardBonusToAll(getRoundBonusForRound(1, ROUND_BONUS, ROUND_BONUS_MULTIPLIER));
		this.spawnRound(level1[1]).await();
		producer.awardBonusToAll(getRoundBonusForRound(2, ROUND_BONUS, ROUND_BONUS_MULTIPLIER));
		this.spawnRound(level1[2]).await();
		producer.awardBonusToAll(getRoundBonusForRound(3, ROUND_BONUS, ROUND_BONUS_MULTIPLIER));
		this.spawnRound(level1[3]).await();
		producer.awardBonusToAll(getRoundBonusForRound(4, ROUND_BONUS, ROUND_BONUS_MULTIPLIER));
		this.spawnRound(level1[4]).await();
		producer.awardBonusToAll(getRoundBonusForRound(5, ROUND_BONUS, ROUND_BONUS_MULTIPLIER));
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

		holdFor(INTERVAL_BETWEEN_ROUNDS_MILLISECONDS);

		return { type: "success" };
	}
}
