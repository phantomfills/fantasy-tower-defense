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
		maxHealth: 10,
		speed: 2.7,
		money: 5,
		traits: [],
		attacks: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 20,
		speed: 5.5,
		money: 25,
		traits: [],
		attacks: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 300,
		speed: 2.5,
		money: 200,
		traits: [],
		attacks: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 40,
		speed: 4,
		money: 75,
		traits: ["STEALTH"],
		attacks: [],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 100,
		speed: 4.5,
		money: 70,
		traits: [],
		attacks: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 25,
		speed: 5.5,
		money: 25,
		traits: [],
		attacks: [],
	},
	GUARD_DUMMY: {
		maxHealth: 500,
		speed: 2.5,
		money: 500,
		traits: ["REINFORCED"],
		attacks: [],
	},
	DUMMY_TANK: {
		maxHealth: 15_000,
		speed: 0.5,
		money: 7_500,
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
