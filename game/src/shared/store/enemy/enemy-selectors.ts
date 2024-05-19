import { SharedState } from "..";
import Object from "@rbxts/object-utils";
import { Tower, selectTowers } from "../tower";
import { Possible, possible } from "shared/modules/utils/possible";
import { getCFrameFromPathCompletionAlpha, getPathLength } from "shared/modules/utils/path-utils";
import { Enemy, Pause } from "./enemy-slice";
import { createSelector } from "@rbxts/reflex";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { isAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { doTowerAndEnemyHaveStealth } from "shared/modules/attack/trait";
import { selectMapState } from "../map";

export function selectNoEnemiesExist(state: SharedState) {
	return Object.keys(state.enemy).size() === 0;
}

export function selectEnemyIsDead(enemyId: string) {
	return createSelector([selectEnemyFromId(enemyId)], (possibleEnemy) => {
		if (!possibleEnemy.exists) return false;

		return possibleEnemy.value.dead;
	});
}

export function selectEnemies(state: SharedState) {
	return state.enemy;
}

export function selectEnemyIdsInTowerRange(towerId: string, currentTimestamp: number) {
	return createSelector([selectEnemies, selectTowers, selectMapState], (enemies, towers, map) => {
		const possibleTower = possible<Tower>(towers[towerId]);
		if (!possibleTower.exists) return [];

		const tower = possibleTower.value;
		const towerStats = describeTowerFromType(tower.towerType, tower.level);

		const enemiesInTowerRange = Object.keys(enemies).filter((enemyId) => {
			const pathCompletionAlpha = selectEnemyPathCompletionAlpha(
				enemyId,
				currentTimestamp,
			)({
				enemy: enemies,
				map: map,
			});
			const enemyCFrame = getCFrameFromPathCompletionAlpha(map.map.path, pathCompletionAlpha);
			const enemyPosition = enemyCFrame.Position;

			const distanceToEnemy = enemyPosition.sub(tower.cframe.Position).Magnitude;
			return distanceToEnemy <= towerStats.range;
		});

		return enemiesInTowerRange;
	});
}

export function selectEnemyCount(state: SharedState) {
	return Object.keys(state.enemy).size();
}

export function selectEnemyFromId(id: string): (state: SharedState) => Possible<Enemy> {
	return (state) => {
		const possibleEnemy = possible<Enemy>(state.enemy[id]);
		return possibleEnemy;
	};
}

export function selectEnemyCFrameFromId(
	id: string,
	currentTimestamp: number,
): (state: SharedState) => Possible<CFrame> {
	return (state) => {
		const possibleEnemy = selectEnemyFromId(id)(state);
		if (!possibleEnemy.exists) return { exists: false };

		const pathCompletionAlpha = selectEnemyPathCompletionAlpha(id, currentTimestamp)(state);
		const cframe = getCFrameFromPathCompletionAlpha(state.map.map.path, pathCompletionAlpha);
		return { exists: true, value: cframe };
	};
}

export function selectEnemyDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => {
		const possibleEnemy = selectEnemyFromId(id)(state);
		return !possibleEnemy.exists;
	};
}

export function selectClosestEnemyIdToPosition(
	position: Vector3,
	currentTimestamp: number,
): (state: SharedState) => Possible<[string, Enemy]> {
	return (state) => {
		const enemies = state.enemy;

		const enemyIds = Object.keys(enemies);
		if (enemyIds.size() === 0) return { exists: false };

		const aliveEnemyIds = enemyIds.filter((enemyId) => !enemies[enemyId].dead);

		const enemyIdsByDistanceToPosition = aliveEnemyIds.sort((previousEnemyId, currentEnemyId) => {
			const previousEnemyPathCompletionAlpha = selectEnemyPathCompletionAlpha(
				previousEnemyId,
				currentTimestamp,
			)(state);

			const previousEnemyPosition = getCFrameFromPathCompletionAlpha(
				state.map.map.path,
				previousEnemyPathCompletionAlpha,
			).Position;

			const currentEnemyPathCompletionAlpha = selectEnemyPathCompletionAlpha(
				currentEnemyId,
				currentTimestamp,
			)(state);
			const currentEnemyPosition = getCFrameFromPathCompletionAlpha(
				state.map.map.path,
				currentEnemyPathCompletionAlpha,
			).Position;

			const previousEnemyDistanceToPosition = previousEnemyPosition.sub(position).Magnitude;
			const currentEnemyDistanceToPosition = currentEnemyPosition.sub(position).Magnitude;

			return previousEnemyDistanceToPosition < currentEnemyDistanceToPosition;
		});
		const closestEnemyId = enemyIdsByDistanceToPosition[0];
		const closestEnemy = state.enemy[closestEnemyId];

		return { exists: true, value: [closestEnemyId, closestEnemy] };
	};
}

export function selectClosestEnemyIdToTower(
	tower: Tower,
	currentTimestamp: number,
): (state: SharedState) => Possible<[string, Enemy]> {
	return selectClosestEnemyIdToPosition(tower.cframe.Position, currentTimestamp);
}

export function selectFirstAttackableEnemyInTowerRange(
	towerId: string,
	currentTimestamp: number,
): (state: SharedState) => Possible<[string, Enemy]> {
	return createSelector([selectEnemies, selectTowers, selectMapState], (enemies, towers, map) => {
		const possibleTower = possible<Tower>(towers[towerId]);
		if (!possibleTower.exists) return { exists: false };

		const tower = possibleTower.value;
		const towerStats = describeTowerFromType(tower.towerType, tower.level);

		const enemiesInTowerRange = Object.keys(enemies).filter((enemyId) => {
			const enemy = enemies[enemyId];
			if (enemy.dead) return false;

			const enemyPathCompletionAlpha = selectEnemyPathCompletionAlpha(
				enemyId,
				currentTimestamp,
			)({
				enemy: enemies,
				map: map,
			});

			const enemyCFrame = getCFrameFromPathCompletionAlpha(map.map.path, enemyPathCompletionAlpha);
			const enemyPosition = enemyCFrame.Position;

			const distanceToEnemy = enemyPosition.sub(tower.cframe.Position).Magnitude;
			return distanceToEnemy <= towerStats.range;
		});
		if (enemiesInTowerRange.isEmpty()) return { exists: false };

		const attackableEnemiesInTowerRange = enemiesInTowerRange.filter((enemyId) => {
			const possibleEnemy = possible<Enemy>(enemies[enemyId]);
			if (!possibleEnemy.exists) return false;

			const { enemyType } = possibleEnemy.value;
			const enemyStats = describeEnemyFromType(enemyType);
			const enemyTraits = enemyStats.traits;

			return doTowerAndEnemyHaveStealth(enemyTraits, towerStats.traits);
		});

		if (attackableEnemiesInTowerRange.isEmpty()) return { exists: false };

		const enemyIdsByPathCompletionAlpha = attackableEnemiesInTowerRange.sort((previousEnemyId, currentEnemyId) => {
			const previousEnemyPathCompletionAlpha = selectEnemyPathCompletionAlpha(
				previousEnemyId,
				currentTimestamp,
			)({
				enemy: enemies,
				map: map,
			});
			const currentEnemyPathCompletionAlpha = selectEnemyPathCompletionAlpha(
				currentEnemyId,
				currentTimestamp,
			)({
				enemy: enemies,
				map: map,
			});

			return currentEnemyPathCompletionAlpha < previousEnemyPathCompletionAlpha;
		});

		const firstEnemyId = enemyIdsByPathCompletionAlpha[0];
		const firstEnemy = enemies[firstEnemyId];

		return { exists: true, value: [firstEnemyId, firstEnemy] };
	});
}

export function getEnemyId(_: Enemy, id: string) {
	return id;
}

export function selectEnemyHealth(enemyId: string): (state: SharedState) => Possible<number> {
	return createSelector([selectEnemyFromId(enemyId)], (enemy) => {
		if (!enemy.exists) return { exists: false };

		return { exists: true, value: enemy.value.health };
	});
}

export function selectAttackingEnemyIds(state: SharedState) {
	const enemies = Object.keys(state.enemy);
	return enemies.filter((enemyId) => {
		const enemy = state.enemy[enemyId];
		return isAttackingEnemyType(enemy.enemyType);
	});
}

export function selectEnemyPathCompletionAlpha(
	id: string,
	currentTimeInMilliseconds: number,
): (state: Pick<SharedState, "enemy" | "map">) => number {
	return (state) => {
		const enemy = state.enemy[id];
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
			}, [] as Pause[]);

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

		const path = state.map.map.path;
		const pathLength = getPathLength(path);
		const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

		const initialPathCompletionAlpha = enemy.initialPathCompletionAlpha ?? 0;
		const pathCompletionAlpha = math.clamp(
			adjustedMillisecondsSinceSpawn / totalMillisecondsToCompletePath + initialPathCompletionAlpha,
			0,
			1,
		);

		return pathCompletionAlpha;
	};
}

export function selectEnemyPathCompletionAlphas(
	currentTimeInMilliseconds: number,
): (state: SharedState) => Record<string, number> {
	return (state) => {
		const enemyPathCompletionAlphas: Record<string, number> = {};

		for (const [id, enemy] of pairs(state.enemy)) {
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
				}, [] as Pause[]);

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

			const path = state.map.map.path;
			const pathLength = getPathLength(path);
			const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

			const initialPathCompletionAlpha = enemy.initialPathCompletionAlpha ?? 0;
			const pathCompletionAlpha = math.clamp(
				adjustedMillisecondsSinceSpawn / totalMillisecondsToCompletePath + initialPathCompletionAlpha,
				0,
				1,
			);

			enemyPathCompletionAlphas[id] = pathCompletionAlpha;
		}

		return enemyPathCompletionAlphas;
	};
}
