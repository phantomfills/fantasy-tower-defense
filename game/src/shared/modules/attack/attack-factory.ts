export interface Attack {
	towerId: string;
	enemyId: string;
	damage: number;
}

export function createBasicAttack(enemyId: string, towerId: string, damage: number): Attack {
	return {
		enemyId,
		towerId,
		damage,
	};
}
