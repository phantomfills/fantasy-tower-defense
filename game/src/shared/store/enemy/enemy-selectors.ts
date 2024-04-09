import { SharedState } from "..";
import Object from "@rbxts/object-utils";
import { Tower, selectTowers } from "../tower";
import { Possible, possible } from "shared/modules/utils/possible";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { Enemy } from "./enemy-slice";
import { createSelector } from "@rbxts/reflex";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";

export function selectNoEnemiesExist(state: SharedState) {
	return Object.keys(state.enemy).size() === 0;
}

export function selectEnemyIsDead(enemyId: string) {
	return createSelector([selectEnemyFromId(enemyId)], (possibleEnemy) => {
		if (!possibleEnemy.exists) return false;

		return possibleEnemy.value.dead;
	});
}

export function selectEnemyPathCompletionAlpha(enemyId: string) {
	return createSelector([selectEnemyFromId(enemyId)], (possibleEnemy) => {
		if (!possibleEnemy.exists) return 0;

		return possibleEnemy.value.pathCompletionAlpha;
	});
}

export function selectEnemies(state: SharedState) {
	return state.enemy;
}

export function selectEnemyIdsInTowerRange(towerId: string) {
	return createSelector([selectEnemies, selectTowers], (enemies, towers) => {
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

export function selectEnemyCount(state: SharedState) {
	return Object.keys(state.enemy).size();
}

export function selectEnemyFromId(id: string): (state: SharedState) => Possible<Enemy> {
	return (state) => {
		const possibleEnemy = possible<Enemy>(state.enemy[id]);
		return possibleEnemy;
	};
}

export function selectEnemyCFrameFromId(id: string): (state: SharedState) => Possible<CFrame> {
	return (state) => {
		const possibleEnemy = selectEnemyFromId(id)(state);
		if (!possibleEnemy.exists) return { exists: false };

		const enemy = possibleEnemy.value;
		const cframe = getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha);
		return { exists: true, value: cframe };
	};
}

export function selectEnemyDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => {
		const possibleEnemy = selectEnemyFromId(id)(state);
		return !possibleEnemy.exists;
	};
}

export function selectClosestEnemyIdToPosition(position: Vector3): (state: SharedState) => Possible<[string, Enemy]> {
	return (state) => {
		const enemies = state.enemy;

		const enemyIds = Object.keys(enemies);
		if (enemyIds.size() === 0) return { exists: false };

		const aliveEnemyIds = enemyIds.filter((enemyId) => !enemies[enemyId].dead);

		const enemyIdsByDistanceToPosition = aliveEnemyIds.sort((previousEnemyId, currentEnemyId) => {
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

		return { exists: true, value: [closestEnemyId, closestEnemy] };
	};
}

export function selectClosestEnemyIdToTower(tower: Tower): (state: SharedState) => Possible<[string, Enemy]> {
	return selectClosestEnemyIdToPosition(tower.cframe.Position);
}

export function selectFirstAttackableEnemyInTowerRange(
	towerId: string,
): (state: SharedState) => Possible<[string, Enemy]> {
	return createSelector([selectEnemies, selectTowers], (enemies, towers) => {
		const possibleTower = possible<Tower>(towers[towerId]);
		if (!possibleTower.exists) return { exists: false };

		const tower = possibleTower.value;
		const towerStats = describeTowerFromType(tower.towerType, tower.level);

		const enemiesInTowerRange = Object.keys(enemies).filter((enemyId) => {
			const enemy = enemies[enemyId];
			if (enemy.dead) return false;

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
			const { traits } = describeEnemyFromType(enemyType);

			return traits.includes("STEALTH") ? towerStats.traits.includes("STEALTH") : true;
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

export function getEnemyId(_: Enemy, id: string) {
	return id;
}

export function selectEnemyHealth(enemyId: string): (state: SharedState) => Possible<number> {
	return createSelector([selectEnemyFromId(enemyId)], (enemy) => {
		if (!enemy.exists) return { exists: false };

		return { exists: true, value: enemy.value.health };
	});
}
