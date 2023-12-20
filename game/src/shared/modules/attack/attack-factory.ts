export interface Attack {
	enemyId: string;
	enemyPosition: Vector3;
	towerId: string;
	damage: number;
}

export function createBasicAttack(enemyId: string, enemyPosition: Vector3, towerId: string, damage: number): Attack {
	return {
		enemyId,
		enemyPosition,
		towerId,
		damage,
	};
}
