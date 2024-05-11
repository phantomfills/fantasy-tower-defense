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
		speed: 3.5,
		money: 5,
		traits: [],
		attacks: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 15,
		speed: 7,
		money: 25,
		traits: [],
		attacks: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 35,
		speed: 2.5,
		money: 30,
		traits: [],
		attacks: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 25,
		speed: 4.5,
		money: 45,
		traits: ["STEALTH"],
		attacks: [],
	},
	MULTIPLIER_DUMMY: {
		maxHealth: 60,
		speed: 3.5,
		money: 35,
		traits: [],
		attacks: [],
	},
	DIVIDED_DUMMY: {
		maxHealth: 15,
		speed: 8.5,
		money: 10,
		traits: [],
		attacks: [],
	},
	GUARD_DUMMY: {
		maxHealth: 250,
		speed: 2.5,
		money: 350,
		traits: ["REINFORCED"],
		attacks: [],
	},
	DUMMY_TANK: {
		maxHealth: 10_000,
		speed: 0.35,
		money: 2_500,
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
