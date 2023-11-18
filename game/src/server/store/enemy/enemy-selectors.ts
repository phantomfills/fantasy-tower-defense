import { Possible } from "shared/modules/util/possible";
import { RootState } from "..";
import { Enemy } from "./enemy-slice";
import { GenericTower } from "server/modules/tower/tower";
import { ClientEnemyInfo, POSITION_PRECISION_MULTIPLIER } from "shared/network";

export function getEnemies(state: RootState) {
	return state.enemy;
}

export function getEnemyCount(state: RootState) {
	return state.enemy.size();
}

export function getClosestEnemyToTower(tower: GenericTower): (state: RootState) => Possible<Enemy> {
	return (state: RootState) => {
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

export function getClientEnemies(state: RootState): ClientEnemyInfo[] {
	return state.enemy.map((enemy) => {
		return {
			id: enemy.id,
			position: new Vector3int16(
				enemy.cframe.Position.X * POSITION_PRECISION_MULTIPLIER,
				enemy.cframe.Position.Y * POSITION_PRECISION_MULTIPLIER,
				enemy.cframe.Position.Z * POSITION_PRECISION_MULTIPLIER,
			),
			rotation: enemy.cframe.Rotation,
		};
	});
}
