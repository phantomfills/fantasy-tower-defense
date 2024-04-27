import { E_EnemyAttack } from "../attack";

interface EnemyAttackConfig {
	chanceUpperBound: number;
	damage: number;
}

const enemyAttackToConfigMap: Record<E_EnemyAttack, EnemyAttackConfig> = {
	BOULDER_THROW: {
		chanceUpperBound: 20,
		damage: 500,
	},
};

export function describeEnemyAttackFromType(attackType: E_EnemyAttack): EnemyAttackConfig {
	return enemyAttackToConfigMap[attackType];
}
