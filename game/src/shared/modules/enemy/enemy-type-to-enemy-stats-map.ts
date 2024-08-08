import { E_EnemyAttack } from "../attack";
import { E_Trait } from "../attack/trait";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	money: number;
	traits: E_Trait[];
	attacks: E_EnemyAttack[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 1,
		speed: 3.7,
		money: 5,
		traits: [],
		attacks: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 12,
		speed: 6.5,
		money: 18,
		traits: [],
		attacks: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 250,
		speed: 1.2,
		money: 225,
		traits: [],
		attacks: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 40,
		speed: 4,
		money: 40,
		traits: ["STEALTH"],
		attacks: [],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 100,
		speed: 4.5,
		money: 80,
		traits: [],
		attacks: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 25,
		speed: 5.5,
		money: 0,
		traits: [],
		attacks: [],
	},
	GUARD_DUMMY: {
		maxHealth: 500,
		speed: 2.5,
		money: 1_500,
		traits: ["REINFORCED"],
		attacks: [],
	},
	DUMMY_TANK: {
		maxHealth: 15_000,
		speed: 0.5,
		money: 8_000,
		traits: [],
		attacks: ["BOULDER_THROW"],
	},
	IMPOSTOR: {
		maxHealth: 500,
		speed: 12,
		money: 2_000,
		traits: [],
		attacks: [],
	},
	CRITICAL_SPORTS_CAR: {
		maxHealth: 50,
		speed: 25,
		money: 125,
		traits: ["REINFORCED"],
		attacks: [],
	},
	KORBLOX_DEATHSPEAKER: {
		maxHealth: 20,
		speed: 4.5,
		money: 30,
		traits: [],
		attacks: [],
	},
	CIRCUIT_BREAKER: {
		maxHealth: 75,
		speed: 3.5,
		money: 55,
		traits: [],
		attacks: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
