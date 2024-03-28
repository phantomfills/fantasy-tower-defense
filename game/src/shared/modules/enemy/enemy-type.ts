const ENEMY_TYPE = [
	"TRAINING_DUMMY",
	"ARMORED_DUMMY",
	"SPEEDSTER_DUMMY",
	"STEALTH_DUMMY",
	"MULTIPLIER_DUMMY",
	"DIVIDED_DUMMY",
	"GUARD_DUMMY",
	"DUMMY_TANK",
] as const;

export type EnemyType = (typeof ENEMY_TYPE)[number];

export function isEnemyType(value: string): value is EnemyType {
	return ENEMY_TYPE.includes(value as EnemyType);
}
