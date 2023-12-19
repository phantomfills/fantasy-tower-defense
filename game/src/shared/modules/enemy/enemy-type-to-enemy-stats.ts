import { EnemyType } from "./enemy-type";

export interface EnemyStats {
	maxHealth: number;
	speed: number;
}

export const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	NINJA: {
		maxHealth: 100,
		speed: 4.5,
	},
};

export function getEnemyStatsFromType(enemyType: EnemyType) {
	return enemyTypeToStatsMap[enemyType];
}
