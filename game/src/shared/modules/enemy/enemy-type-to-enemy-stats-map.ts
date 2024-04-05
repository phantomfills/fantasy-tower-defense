import { Trait } from "../attack/immunity";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	money: number;
	traits: Trait[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 8,
		speed: 2,
		money: 10,
		traits: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 30,
		speed: 4.5,
		money: 25,
		traits: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 50,
		speed: 2,
		money: 20,
		traits: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 160,
		speed: 2.5,
		money: 50,
		traits: ["STEALTH"],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 100,
		speed: 1.5,
		money: 35,
		traits: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 50,
		speed: 4.5,
		money: 0,
		traits: [],
	},
	GUARD_DUMMY: {
		maxHealth: 1_000,
		speed: 1.5,
		money: 250,
		traits: ["REINFORCED"],
	},
	DUMMY_TANK: {
		maxHealth: 15_000,
		speed: 0.9,
		money: 3_500,
		traits: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
