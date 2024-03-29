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
		maxHealth: 30,
		speed: 4.5,
		traits: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 80,
		speed: 2,
		traits: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 160,
		speed: 2.5,
		traits: ["STEALTH"],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 150,
		speed: 2,
		traits: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 15,
		speed: 3.5,
		traits: [],
	},
	GUARD_DUMMY: {
		maxHealth: 1_400,
		speed: 1.5,
		traits: ["REINFORCED"],
	},
	DUMMY_TANK: {
		maxHealth: 20_000,
		speed: 0.9,
		traits: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
