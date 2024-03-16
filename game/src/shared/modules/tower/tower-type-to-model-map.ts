import { TowerModel } from "./tower-model";
import { TowerType } from "./tower-type";
import { ReplicatedStorage } from "@rbxts/services";

const assets = ReplicatedStorage.assets;
const archerModels = assets.towers.archer.models;

const towerTypeToModelsMap = {
	ARCHER: [archerModels.level_0, archerModels.level_1],
} satisfies Record<TowerType, TowerModel[]>;

export function getTowerPlacementModelFromType(_type: TowerType) {
	return towerTypeToModelsMap[_type][0].Clone();
}

export function getTowerModelFromTypeAndLevel(_type: TowerType, level: number) {
	return towerTypeToModelsMap[_type][level].Clone();
}
