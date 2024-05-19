import { OnStart, OnTick, Service } from "@flamework/core";
import { attackTower } from "server/events";
import { createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyAttack } from "shared/modules/attack";
import { describeEnemyAttackFromType } from "shared/modules/enemy/enemy-attack-to-config-map";
import { isAttackingEnemy } from "shared/modules/enemy/enemy-type";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { getCFrameFromPathCompletionAlpha, getPathLength } from "shared/modules/utils/path-utils";
import {
	Enemy,
	getEnemyId,
	Pause,
	selectAttackingEnemyIds,
	selectEnemies,
	selectEnemyFromId,
	selectEnemyIsDead,
	selectEnemyPathCompletionAlpha,
} from "shared/store/enemy";
import { selectMap } from "shared/store/map";
import { selectClosestTowerIdToPosition } from "shared/store/tower";

function handleEnemyIsDead(enemy: Enemy, id: string, isDead: boolean) {
	if (!isDead) return;

	if (enemy.enemyType === "MULTIPLIER_DUMMY") {
		const pathCompletionAlpha = producer.getState(
			selectEnemyPathCompletionAlpha(id, getCurrentTimeInMilliseconds()),
		);

		for (const _ of $range(0, 1)) {
			const spawnedEnemy = createNonAttackingEnemy("DIVIDED_DUMMY", pathCompletionAlpha);
			producer.addEnemy(spawnedEnemy, createId());
		}
	}

	producer.removeEnemy(id);
}

function getEnemyIdsWhichHaveReachedPathEnd(): string[] {
	const enemyIds: string[] = [];
	const currentTimeInMilliseconds = getCurrentTimeInMilliseconds();

	const enemies = producer.getState(selectEnemies);
	for (const [id, enemy] of pairs(enemies)) {
		const enemyStats = describeEnemyFromType(enemy.enemyType);

		const millisecondsSinceSpawn = currentTimeInMilliseconds - enemy.spawnTimestamp;

		// Merge overlapping pauses
		const mergedPauses = enemy.pauses
			.sort((a, b) => a.startTime < b.startTime)
			.reduce((merged, pause) => {
				if (
					merged.size() === 0 ||
					merged[merged.size() - 1].startTime + merged[merged.size() - 1].pauseFor < pause.startTime
				) {
					merged.push(pause);
				} else {
					merged[merged.size() - 1].pauseFor = math.max(
						merged[merged.size() - 1].pauseFor,
						pause.startTime + pause.pauseFor - merged[merged.size() - 1].startTime,
					);
				}
				return merged;
			}, new Array<Pause>());

		// Calculate the total time the enemy has spent pausing
		const totalPauseTimeServed = mergedPauses
			.map((pause) => {
				const pauseEndTime = pause.startTime + pause.pauseFor;
				if (currentTimeInMilliseconds < pause.startTime) {
					// The pause hasn't started yet
					return 0;
				} else if (currentTimeInMilliseconds < pauseEndTime) {
					// The pause is in progress
					return currentTimeInMilliseconds - pause.startTime;
				} else {
					// The pause has finished
					return pause.pauseFor;
				}
			})
			.reduce((total, pauseTimeServed) => total + pauseTimeServed, 0);

		const adjustedMillisecondsSinceSpawn = millisecondsSinceSpawn - totalPauseTimeServed;

		const path = producer.getState(selectMap).path;
		const pathLength = getPathLength(path);
		const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

		const initialPathCompletionAlpha = enemy.initialPathCompletionAlpha ?? 0;
		const pathCompletionAlpha = math.clamp(
			adjustedMillisecondsSinceSpawn / totalMillisecondsToCompletePath + initialPathCompletionAlpha,
			0,
			1,
		);

		if (pathCompletionAlpha < 1) continue;
		enemyIds.push(id);
	}

	return enemyIds;
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	private lastEnemyAttackCycle: number = getCurrentTimeInMilliseconds();

	onStart() {
		producer.observe(selectEnemies, getEnemyId, (enemy, id) => {
			handleEnemyIsDead(enemy, id, producer.getState(selectEnemyIsDead(id)));

			const unsubscribe = producer.subscribe(selectEnemyIsDead(id), (isDead) => {
				handleEnemyIsDead(enemy, id, isDead);
				unsubscribe();
			});

			return () => {
				unsubscribe();
			};
		});
	}

	triggerRandomChanceForTowerAttack() {
		const attackingEnemies = producer.getState(selectAttackingEnemyIds);

		for (const enemyId of attackingEnemies) {
			const possibleEnemyId = producer.getState(selectEnemyFromId(enemyId));
			if (!possibleEnemyId.exists) continue;

			const enemy = possibleEnemyId.value;
			if (!isAttackingEnemy(enemy)) continue;

			const { attacks } = describeEnemyFromType(enemy.enemyType);

			attacks.forEach((attackType) => {
				const { damage, chanceUpperBound } = describeEnemyAttackFromType(attackType);

				const numberRange: [number, number] = [0, chanceUpperBound];

				const enemyRandom = math.random(numberRange[0], numberRange[1]);
				if (enemyRandom !== 0) return;

				const path = producer.getState(selectMap).path;
				const pathCompletionAlpha = producer.getState(
					selectEnemyPathCompletionAlpha(enemyId, getCurrentTimeInMilliseconds()),
				);
				const possibleClosestTowerId = producer.getState(
					selectClosestTowerIdToPosition(
						getCFrameFromPathCompletionAlpha(path, pathCompletionAlpha).Position,
					),
				);
				if (!possibleClosestTowerId.exists) return;

				const towerId = possibleClosestTowerId.value;
				const enemyAttack: EnemyAttack = {
					attackType: "BOULDER_THROW",
					damage,
					enemyId,
					towerId,
				};

				attackTower.Fire(enemyAttack);
			});
		}
	}

	onTick() {
		const currentTime = getCurrentTimeInMilliseconds();

		const enemyIdsWhichHaveReachedPathEnd = getEnemyIdsWhichHaveReachedPathEnd();
		enemyIdsWhichHaveReachedPathEnd.forEach((id) => {
			producer.removeEnemy(id);
		});

		const nextEnemyAttackCycle = this.lastEnemyAttackCycle + 1000;
		if (currentTime < nextEnemyAttackCycle) return;

		this.lastEnemyAttackCycle = currentTime;

		this.triggerRandomChanceForTowerAttack();
	}
}
