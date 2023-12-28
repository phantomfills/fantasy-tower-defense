import { SharedState } from "..";
import Object from "@rbxts/object-utils";
import { Tower } from "../tower";
import { Possible, possible } from "shared/modules/util/possible";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/util/path-utils";
import { Enemy } from "./enemy-slice";
import { createSelector } from "@rbxts/reflex";
import { describeTower } from "shared/modules/tower/tower-type-to-tower-stats-map";

export function getEnemies(state: SharedState) {
	return state.enemy;
}

export function getEnemyIdsInTowerRange(tower: Tower) {
	const towerStats = describeTower(tower.type);

	return createSelector([getEnemies], (enemies) => {
		const enemiesInTowerRange = Object.keys(enemies).filter((enemyId) => {
			const enemy = enemies[enemyId];
			const enemyCFrame = getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha);
			const enemyPosition = enemyCFrame.Position;

			const distanceToEnemy = enemyPosition.sub(tower.cframe.Position).Magnitude;
			return distanceToEnemy <= towerStats.range;
		});

		return enemiesInTowerRange;
	});
}

export function enemiesAreInTowerRange(tower: Tower): (state: SharedState) => boolean {
	return (state) => {
		const enemiesInTowerRange = getEnemyIdsInTowerRange(tower)(state);
		return enemiesInTowerRange.size() > 0;
	};
}

export function getEnemyCount(state: SharedState) {
	return Object.keys(state.enemy).size();
}

export function getEnemyFromId(id: string): (state: SharedState) => Possible<Enemy> {
	return (state) => {
		const possibleEnemy = possible<Enemy>(state.enemy[id]);
		return possibleEnemy;
	};
}

export function getEnemyCFrameFromId(id: string): (state: SharedState) => Possible<CFrame> {
	return (state) => {
		const possibleEnemy = getEnemyFromId(id)(state);
		if (!possibleEnemy.exists) return { exists: false };

		const enemy = possibleEnemy.value;
		const cframe = getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha);
		return { exists: true, value: cframe };
	};
}

export function enemyDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => {
		const possibleEnemy = getEnemyFromId(id)(state);
		return !possibleEnemy.exists;
	};
}

export function getClosestEnemyIdToPosition(position: Vector3): (state: SharedState) => Possible<[string, number]> {
	return (state) => {
		const enemies = state.enemy;

		const enemyIds = Object.keys(enemies);
		if (enemyIds.size() === 0) return { exists: false };

		const enemyIdsByDistanceToPosition = enemyIds.sort((previousEnemyId, currentEnemyId) => {
			const previousEnemy = enemies[previousEnemyId];
			const previousEnemyPosition = getCFrameFromPathCompletionAlpha(
				previousEnemy.path,
				previousEnemy.pathCompletionAlpha,
			).Position;

			const currentEnemy = enemies[currentEnemyId];
			const currentEnemyPosition = getCFrameFromPathCompletionAlpha(
				currentEnemy.path,
				currentEnemy.pathCompletionAlpha,
			).Position;

			const previousEnemyDistanceToPosition = previousEnemyPosition.sub(position).Magnitude;
			const currentEnemyDistanceToPosition = currentEnemyPosition.sub(position).Magnitude;

			return previousEnemyDistanceToPosition < currentEnemyDistanceToPosition;
		});
		const closestEnemyId = enemyIdsByDistanceToPosition[0];
		const closestEnemyPosition = getCFrameFromPathCompletionAlpha(
			enemies[closestEnemyId].path,
			enemies[closestEnemyId].pathCompletionAlpha,
		).Position;
		const closestEnemyDistanceToPosition = closestEnemyPosition.sub(position).Magnitude;

		return { exists: true, value: [closestEnemyId, closestEnemyDistanceToPosition] };
	};
}

export function getClosestEnemyIdToTower(tower: Tower): (state: SharedState) => Possible<[string, number]> {
	return getClosestEnemyIdToPosition(tower.cframe.Position);
}
