import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	WEAK_DUMMY: {
		maxHealth: 25,
		speed: 3,
	},
	STRONG_DUMMY: {
		maxHealth: 35,
		speed: 5,
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
