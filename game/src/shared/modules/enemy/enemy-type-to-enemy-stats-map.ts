import { Immunity } from "../attack/immunity";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	immunities: Immunity[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 30,
		speed: 3.5,
		immunities: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 50,
		speed: 7.5,
		immunities: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 125,
		speed: 3,
		immunities: ["REINFORCED"],
	},
	STEALTH_DUMMY: {
		maxHealth: 200,
		speed: 5.5,
		immunities: ["STEALTH"],
	},
	DUMMY_TANK: {
		maxHealth: 100_000,
		speed: 1,
		immunities: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
