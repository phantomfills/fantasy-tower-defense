import { EnemyType } from "./enemy-type";

const enemyTypeToDisplayNameMap: Record<EnemyType, string> = {
	TRAINING_DUMMY: "Training Dummy",
	ARMORED_DUMMY: "Armored Dummy",
	SPEEDSTER_DUMMY: "Speedster Dummy",
	STEALTH_DUMMY: "Stealth Dummy",
	MULTIPLIER_DUMMY: "Multiplier Dummy",
	DIVIDED_DUMMY: "Divided Dummy",
	GUARD_DUMMY: "Guard Dummy",
	DUMMY_TANK: "Dummy Tank",
};

export function getEnemyDisplayName(enemyType: EnemyType): string {
	return enemyTypeToDisplayNameMap[enemyType];
}
