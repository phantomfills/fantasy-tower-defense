import { ReplicatedStorage } from "@rbxts/services";
import { TowerType } from "./tower-type";

const assets = ReplicatedStorage.assets;
const archerModels = assets.towers.archer.models;

const towerTypeToModelsMap = {
	ARCHER: [
		archerModels.level_0,
		archerModels.level_1,
		archerModels.level_2,
		archerModels.level_3,
		archerModels.level_4,
		archerModels.level_5,
	],
} as const satisfies Record<TowerType, unknown>;

export function getTowerModel<T extends TowerType, U extends number>(
	towerType: T,
	level: U,
): (typeof towerTypeToModelsMap)[T][U] {
	return towerTypeToModelsMap[towerType][level].Clone();
}
