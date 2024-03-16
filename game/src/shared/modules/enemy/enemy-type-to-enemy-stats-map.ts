import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	WEAK_DUMMY: {
		maxHealth: 50,
		speed: 4,
	},
	STRONG_DUMMY: {
		maxHealth: 250,
		speed: 2,
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
