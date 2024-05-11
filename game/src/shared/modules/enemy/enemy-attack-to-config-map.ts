import { E_EnemyAttack } from "../attack";

interface EnemyAttackConfig {
	chanceUpperBound: number;
	damage: number;
}

const enemyAttackToConfigMap: Record<E_EnemyAttack, EnemyAttackConfig> = {
	BOULDER_THROW: {
		chanceUpperBound: 15,
		damage: 100,
	},
};

export function describeEnemyAttackFromType(attackType: E_EnemyAttack): EnemyAttackConfig {
	return enemyAttackToConfigMap[attackType];
}
