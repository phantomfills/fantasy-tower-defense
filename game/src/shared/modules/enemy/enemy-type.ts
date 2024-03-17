export const ENEMY_TYPE = ["TRAINING_DUMMY", "ARMORED_DUMMY", "SPEEDSTER_DUMMY", "STEALTH_DUMMY"] as const;

export type EnemyType = (typeof ENEMY_TYPE)[number];
