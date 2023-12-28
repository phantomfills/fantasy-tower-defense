import { EnemyType } from "./enemy-type";

const enemyTypeToDisplayNameMap: Record<EnemyType, string> = {
	WEAK_DUMMY: "Weak Dummy",
	STRONG_DUMMY: "Strong Dummy",
};

export function getEnemyDisplayName(enemyType: EnemyType) {
	return enemyTypeToDisplayNameMap[enemyType];
}
