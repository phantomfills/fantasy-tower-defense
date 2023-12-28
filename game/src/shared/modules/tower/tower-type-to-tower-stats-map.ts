import { TowerType } from "./tower-type";

interface TowerStats {
	damage: number;
	range: number;
	firerate: number;
	health: number;
}

const towerTypeToStatsMap: Record<TowerType, TowerStats> = {
	ARCHER: {
		damage: 5,
		range: 12,
		firerate: 0.1,
		health: 500,
	},
};

export function describeTowerFromType(towerType: TowerType) {
	return towerTypeToStatsMap[towerType];
}
