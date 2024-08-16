import { EnemyType } from "./enemy-type";

const enemyTypeToDisplayNameMap: Record<EnemyType, string> = {
	ZOMBIE: "Zombie",
	ZOMBIE_SWORDER: "Zombie Sworder",
};

export function getEnemyDisplayName(enemyType: EnemyType): string {
	return enemyTypeToDisplayNameMap[enemyType];
}
