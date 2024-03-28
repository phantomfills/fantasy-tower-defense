import { Trait } from "../attack/immunity";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	traits: Trait[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 8,
		speed: 2,
		traits: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 25,
		speed: 4.5,
		traits: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 115,
		speed: 2,
		traits: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 160,
		speed: 2.5,
		traits: ["STEALTH"],
	},
	GUARD_DUMMY: {
		maxHealth: 1_000,
		speed: 1.5,
		traits: ["REINFORCED"],
	},
	DUMMY_TANK: {
		maxHealth: 10_000,
		speed: 1.5,
		traits: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
