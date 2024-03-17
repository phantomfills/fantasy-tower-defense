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
		speed: 50,
		immunities: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 200,
		speed: 50,
		immunities: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 100,
		speed: 50,
		immunities: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 300,
		speed: 50,
		immunities: ["STEALTH"],
	},
	DUMMY_TANK: {
		maxHealth: 1_000_000,
		speed: 0.2,
		immunities: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
