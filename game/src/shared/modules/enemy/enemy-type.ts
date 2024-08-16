import { AttackingEnemy, Enemy } from "shared/store/enemy";

export const ALL_NON_ATTACKING_ENEMY_TYPES = ["ZOMBIE", "ZOMBIE_SWORDER"] as const;

export const ALL_ATTACKING_ENEMY_TYPES = [] as const;

export const ALL_ENEMY_TYPES = [...ALL_NON_ATTACKING_ENEMY_TYPES, ...ALL_ATTACKING_ENEMY_TYPES] as const;

export type NonAttackingEnemyType = (typeof ALL_NON_ATTACKING_ENEMY_TYPES)[number];
export type AttackingEnemyType = (typeof ALL_ATTACKING_ENEMY_TYPES)[number];
export type EnemyType = (typeof ALL_ENEMY_TYPES)[number];

export function isNonAttackingEnemyType(enemyType: EnemyType): enemyType is NonAttackingEnemyType {
	return ALL_NON_ATTACKING_ENEMY_TYPES.includes(enemyType as NonAttackingEnemyType);
}

export function isAttackingEnemyType(enemyType: EnemyType): enemyType is AttackingEnemyType {
	return ALL_ATTACKING_ENEMY_TYPES.includes(enemyType as AttackingEnemyType);
}

export function isAttackingEnemy(enemy: Enemy): enemy is AttackingEnemy {
	return isAttackingEnemyType(enemy.enemyType);
}
