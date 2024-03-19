export interface Attack {
	enemyId: string;
	enemyPosition: Vector3;
	towerId: string;
	damage: number;
	id: string;
}

export function createBasicAttack(
	id: string,
	enemyId: string,
	enemyPosition: Vector3,
	towerId: string,
	damage: number,
): Attack {
	return {
		enemyId,
		enemyPosition,
		towerId,
		damage,
		id,
	};
}
