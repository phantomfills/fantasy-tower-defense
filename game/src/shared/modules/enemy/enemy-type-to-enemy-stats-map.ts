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
		maxHealth: 5,
		speed: 2,
		money: 15,
		traits: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 8,
		speed: 3,
		money: 35,
		traits: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 15,
		speed: 1,
		money: 25,
		traits: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 25,
		speed: 2,
		money: 50,
		traits: ["STEALTH"],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 25,
		speed: 2,
		money: 45,
		traits: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 5,
		speed: 5,
		money: 15,
		traits: [],
	},
	GUARD_DUMMY: {
		maxHealth: 175,
		speed: 1,
		money: 160,
		traits: ["REINFORCED"],
	},
	DUMMY_TANK: {
		maxHealth: 2_000,
		speed: 0.5,
		money: 1_000,
		traits: [],
	},
	IMPOSTOR: {
		maxHealth: 420,
		speed: 16,
		money: 69,
		traits: [],
	},
	CRITICAL_SPORTS_CAR: {
		maxHealth: 69,
		speed: 50,
		money: 420,
		traits: ["REINFORCED"],
	},
	KORBLOX_DEATHSPEAKER: {
		maxHealth: 1_500,
		speed: 1,
		money: 1_000,
		traits: ["STEALTH"],
	},
	CIRCUIT_BREAKER: {
		maxHealth: 225,
		speed: 3,
		money: 175,
		traits: ["REINFORCED"],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
