import { Service, OnStart } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { getMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 10_000;

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
			enemyType: "WEAK_DUMMY",
			count: 6,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "WEAK_DUMMY",
			count: 10,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "WEAK_DUMMY",
			count: 9,
			enemySpawnInterval: 500,
			delayToNextGroup: 1500,
		},
		{
			enemyType: "STRONG_DUMMY",
			count: 3,
			enemySpawnInterval: 250,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "WEAK_DUMMY",
			count: 6,
			enemySpawnInterval: 500,
			delayToNextGroup: 3000,
		},
		{
			enemyType: "STRONG_DUMMY",
			count: 12,
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

		this.spawnRound(level1[0]);
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

		return {
			type: "success",
		};
	}
}
