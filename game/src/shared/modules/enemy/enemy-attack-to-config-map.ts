import { E_EnemyAttack } from "../attack";

interface EnemyAttackConfig {
	chanceUpperBound: number;
	damage: number;
	delay?: number;
}

const enemyAttackToConfigMap: Record<E_EnemyAttack, EnemyAttackConfig> = {
	BOULDER_THROW: {
		chanceUpperBound: 16,
		damage: 150,
		delay: 1100,
	},
};

export function describeEnemyAttackFromType(attackType: E_EnemyAttack): EnemyAttackConfig {
	return enemyAttackToConfigMap[attackType];
}
