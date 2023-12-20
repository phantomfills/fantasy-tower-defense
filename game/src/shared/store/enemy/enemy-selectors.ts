import { SharedState } from "..";
import Object from "@rbxts/object-utils";
import { Tower } from "../tower";
import { Possible, possible } from "shared/modules/util/possible";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/util/path-utils";
import { Enemy } from "./enemy-slice";

export function getEnemies(state: SharedState) {
	return state.enemy;
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

export function getClosestEnemyIdToTower(tower: Tower): (state: SharedState) => Possible<string> {
	return (state) => {
		const towerPosition = tower.cframe.Position;

		const enemies = state.enemy;

		const enemyIds = Object.keys(enemies);
		if (enemyIds.size() === 0) return { exists: false };

		const enemyIdsByDistanceToTower = enemyIds.sort((previousEnemyId, currentEnemyId) => {
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

			const previousEnemyDistanceToTower = previousEnemyPosition.sub(towerPosition).Magnitude;
			const currentEnemyDistanceToTower = currentEnemyPosition.sub(towerPosition).Magnitude;

			return previousEnemyDistanceToTower < currentEnemyDistanceToTower;
		});
		const closestEnemyId = enemyIdsByDistanceToTower[0];

		return { exists: true, value: closestEnemyId };
	};
}
