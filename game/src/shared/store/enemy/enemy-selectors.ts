import { Possible } from "shared/modules/util/possible";
import { SharedState } from "..";
import { Enemy } from "./enemy-slice";
import { GenericTower } from "../../modules/tower/tower";

export function getEnemies(state: SharedState) {
	return state.enemy;
}

export function getEnemyCount(state: SharedState) {
	return state.enemy.size();
}

export function getClosestEnemyToTower(tower: GenericTower): (state: SharedState) => Possible<Enemy> {
	return (state) => {
		const enemiesInTowerRange = state.enemy
			.filter((enemy) => {
				const cframe = enemy.cframe;
				const position = cframe.Position;

				return tower.getPositionInRange(position);
			})
			.sort((lastEnemy, currentEnemy) => {
				const towerPosition = tower.getStat("cframe").Position;

				const distanceToLastEnemy = lastEnemy.cframe.Position.sub(towerPosition).Magnitude;
				const distanceToCurrentEnemy = currentEnemy.cframe.Position.sub(towerPosition).Magnitude;

				return distanceToLastEnemy < distanceToCurrentEnemy;
			});
		if (enemiesInTowerRange.size() < 1)
			return {
				exists: false,
			};
		return {
			exists: true,
			value: enemiesInTowerRange[0],
		};
	};
}
