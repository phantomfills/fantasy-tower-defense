export type E_EnemyAttack = "BOULDER_THROW";

export interface EnemyAttack {
	enemyId: string;
	towerId: string;
	damage: number;
	attackType: E_EnemyAttack;
}

export function createBasicEnemyAttack(
	enemyId: string,
	towerId: string,
	damage: number,
	attackType: E_EnemyAttack,
): EnemyAttack {
	return {
		enemyId,
		towerId,
		damage,
		attackType,
	};
}

export interface TowerAttack {
	enemyId: string;
	enemyPosition: Vector3;
	towerId: string;
	damage: number;
	id: string;
}

export function createBasicTowerAttack(
	id: string,
	enemyId: string,
	enemyPosition: Vector3,
	towerId: string,
	damage: number,
): TowerAttack {
	return {
		enemyId,
		enemyPosition,
		towerId,
		damage,
		id,
	};
}
