import { EnemyType } from "./enemy-type";

export interface EnemyStats {
	maxHealth: number;
	speed: number;
}

export const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	NINJA: {
		maxHealth: 20,
		speed: 6,
	},
};

export function getEnemyStatsFromType(enemyType: EnemyType) {
	return enemyTypeToStatsMap[enemyType];
}
