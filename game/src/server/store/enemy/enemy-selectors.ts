import { RootState } from "..";
import { Enemy } from "./enemy-slice";
import { GenericTower } from "server/modules/tower/tower";
import { ClientEnemyInfo, POSITION_PRECISION_MULTIPLIER } from "shared/network";

export function getEnemies(state: RootState) {
	return state.enemy;
}

export function getEnemiesInTowerRange(tower: GenericTower): (state: RootState) => Enemy[] {
	return (state: RootState) => {
		return state.enemy.filter((enemy) => {
			const cframe = enemy.cframe;
			const position = cframe.Position;

			return tower.getPositionInRange(position);
		});
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
