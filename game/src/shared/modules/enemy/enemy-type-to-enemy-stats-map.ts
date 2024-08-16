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
	ZOMBIE: {
		maxHealth: 100,
		speed: 2.5,
		money: 50,
		traits: [],
		attacks: [],
	},
	ZOMBIE_SWORDER: {
		maxHealth: 250,
		speed: 5,
		money: 200,
		traits: [],
		attacks: [],
	},
};

export function describeEnemyFromType(enemyType: EnemyType): EnemyStats {
	return enemyTypeToStatsMap[enemyType];
}
