import { TowerModel } from "./tower-model";
import { TowerType } from "./tower-type";
import { ReplicatedStorage } from "@rbxts/services";

const towerTypeToModelMap: Record<TowerType, TowerModel> = {
	ARCHER: ReplicatedStorage.assets.towers.archer.models.archer,
};

export function getTowerModelFromType(_type: TowerType) {
	return towerTypeToModelMap[_type];
}
