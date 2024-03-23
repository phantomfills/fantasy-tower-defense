import { Trait } from "../attack/immunity";
import { EnemyType } from "./enemy-type";

interface EnemyStats {
	maxHealth: number;
	speed: number;
	traits: Trait[];
}

const enemyTypeToStatsMap: Record<EnemyType, EnemyStats> = {
	TRAINING_DUMMY: {
		maxHealth: 30,
		speed: 2,
		traits: [],
	},
	SPEEDSTER_DUMMY: {
		maxHealth: 50,
		speed: 3,
		traits: [],
	},
	ARMORED_DUMMY: {
		maxHealth: 125,
		speed: 1.5,
		traits: [],
	},
	STEALTH_DUMMY: {
		maxHealth: 200,
		speed: 3,
		traits: ["STEALTH"],
	},
	GUARD_DUMMY: {
		maxHealth: 1_500,
		speed: 1.5,
		traits: ["REINFORCED"],
	},
	DUMMY_TANK: {
		maxHealth: 20_000,
		speed: 1,
		traits: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
