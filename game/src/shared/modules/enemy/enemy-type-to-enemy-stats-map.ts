import { EnemyType } from "./enemy-type";

export interface EnemyStats {
	maxHealth: number;
	speed: number;
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	WEAK_DUMMY: {
		maxHealth: 50,
		speed: 4,
	},
	STRONG_DUMMY: {
		maxHealth: 150,
		speed: 5.5,
	},
};

export function describeEnemy(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
