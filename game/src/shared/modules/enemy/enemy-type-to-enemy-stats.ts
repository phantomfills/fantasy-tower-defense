import { EnemyType } from "./enemy-type";

export interface EnemyStats {
	maxHealth: number;
	speed: number;
}

export const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	WEAK_DUMMY: {
		maxHealth: 100,
		speed: 4,
	},
	STRONG_DUMMY: {
		maxHealth: 200,
		speed: 6,
	},
};

export function getEnemyStatsFromType(enemyType: EnemyType) {
	return enemyTypeToStatsMap[enemyType];
}
