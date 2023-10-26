export const ENEMY_TYPE = ["NINJA"] as const;

export type EnemyType = (typeof ENEMY_TYPE)[number];
