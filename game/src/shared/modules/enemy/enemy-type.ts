export const ENEMY_TYPE = ["WEAK_DUMMY", "STRONG_DUMMY"] as const;

export type EnemyType = (typeof ENEMY_TYPE)[number];
