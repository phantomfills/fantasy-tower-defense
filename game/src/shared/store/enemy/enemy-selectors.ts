import { SharedState } from "..";
import Object from "@rbxts/object-utils";
import { Tower, selectTowers } from "../tower";
import { Possible, possible } from "shared/modules/utils/possible";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { Enemy } from "./enemy-slice";
import { createSelector } from "@rbxts/reflex";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";

export function noEnemiesExist(state: SharedState) {
	return Object.keys(state.enemy).size() === 0;
}

export function getEnemies(state: SharedState) {
	return state.enemy;
}

export function getEnemyIdsInTowerRange(towerId: string) {
	return createSelector([getEnemies, selectTowers], (enemies, towers) => {
		const possibleTower = possible<Tower>(towers[towerId]);
		if (!possibleTower.exists) return [];

		const tower = possibleTower.value;
		const towerStats = describeTowerFromType(tower.towerType, tower.level);

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

export function getClosestEnemyIdToPosition(position: Vector3): (state: SharedState) => Possible<[string, Enemy]> {
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
		const closestEnemy = state.enemy[closestEnemyId];
		const closestEnemyPosition = getCFrameFromPathCompletionAlpha(
			enemies[closestEnemyId].path,
			enemies[closestEnemyId].pathCompletionAlpha,
		).Position;
		const closestEnemyDistanceToPosition = closestEnemyPosition.sub(position).Magnitude;

		return { exists: true, value: [closestEnemyId, closestEnemy] };
	};
}

export function getClosestEnemyIdToTower(tower: Tower): (state: SharedState) => Possible<[string, Enemy]> {
	return getClosestEnemyIdToPosition(tower.cframe.Position);
}

export function getFirstAttackableEnemyInTowerRange(
	towerId: string,
): (state: SharedState) => Possible<[string, Enemy]> {
	return createSelector([getEnemies, selectTowers], (enemies, towers) => {
		const possibleTower = possible<Tower>(towers[towerId]);
		if (!possibleTower.exists) return { exists: false };

		const tower = possibleTower.value;
		const towerStats = describeTowerFromType(tower.towerType, tower.level);

		const enemiesInTowerRange = Object.keys(enemies).filter((enemyId) => {
			const enemy = enemies[enemyId];
			const enemyCFrame = getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha);
			const enemyPosition = enemyCFrame.Position;

			const distanceToEnemy = enemyPosition.sub(tower.cframe.Position).Magnitude;
			return distanceToEnemy <= towerStats.range;
		});
		if (enemiesInTowerRange.isEmpty()) return { exists: false };

		const attackableEnemiesInTowerRange = enemiesInTowerRange.filter((enemyId) => {
			const possibleEnemy = possible<Enemy>(enemies[enemyId]);
			if (!possibleEnemy.exists) return false;

			const { enemyType } = possibleEnemy.value;
			const { immunities } = describeEnemyFromType(enemyType);

			return immunities.includes("STEALTH") ? towerStats.traits.includes("STEALTH") : true;
		});

		if (attackableEnemiesInTowerRange.isEmpty()) return { exists: false };

		const enemyIdsByPathCompletionAlpha = attackableEnemiesInTowerRange.sort((previousEnemyId, currentEnemyId) => {
			const previousEnemy = enemies[previousEnemyId];
			const currentEnemy = enemies[currentEnemyId];

			return previousEnemy.pathCompletionAlpha > currentEnemy.pathCompletionAlpha;
		});

		const firstEnemyId = enemyIdsByPathCompletionAlpha[0];
		const firstEnemy = enemies[firstEnemyId];

		return { exists: true, value: [firstEnemyId, firstEnemy] };
	});
}
