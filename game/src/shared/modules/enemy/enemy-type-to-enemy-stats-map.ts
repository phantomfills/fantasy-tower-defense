import { EnemyType } from "./enemy-type";

type Immunity = "STEALTH";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	immunities: Immunity[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 50,
		speed: 5,
		immunities: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 200,
		speed: 3,
		immunities: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 100,
		speed: 7,
		immunities: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 300,
		speed: 5,
		immunities: ["STEALTH"],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
