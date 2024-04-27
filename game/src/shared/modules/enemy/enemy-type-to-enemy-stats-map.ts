import { E_EnemyAttack } from "../attack";
import { Trait } from "../attack/immunity";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	money: number;
	traits: Trait[];
	attacks: E_EnemyAttack[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 5,
		speed: 2,
		money: 15,
		traits: [],
		attacks: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 8,
		speed: 3,
		money: 35,
		traits: [],
		attacks: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 15,
		speed: 1,
		money: 25,
		traits: [],
		attacks: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 25,
		speed: 2,
		money: 50,
		traits: ["STEALTH"],
		attacks: [],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 25,
		speed: 2,
		money: 45,
		traits: [],
		attacks: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 5,
		speed: 5,
		money: 15,
		traits: [],
		attacks: [],
	},
	GUARD_DUMMY: {
		maxHealth: 175,
		speed: 1,
		money: 160,
		traits: ["REINFORCED"],
		attacks: [],
	},
	DUMMY_TANK: {
		maxHealth: 5_000,
		speed: 0.5,
		money: 1_350,
		traits: [],
		attacks: ["BOULDER_THROW"],
	},
	IMPOSTOR: {
		maxHealth: 420,
		speed: 16,
		money: 69,
		traits: [],
		attacks: [],
	},
	CRITICAL_SPORTS_CAR: {
		maxHealth: 69,
		speed: 50,
		money: 420,
		traits: ["REINFORCED"],
		attacks: [],
	},
	KORBLOX_DEATHSPEAKER: {
		maxHealth: 20,
		speed: 4.5,
		money: 35,
		traits: [],
		attacks: [],
	},
	CIRCUIT_BREAKER: {
		maxHealth: 5,
		speed: 3.5,
		money: 20,
		traits: [],
		attacks: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
