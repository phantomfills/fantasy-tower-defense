import { TowerModel } from "./tower-model";
import { TowerType } from "./tower-type";
import { ReplicatedStorage } from "@rbxts/services";

export const towerTypeToModelMap: Record<TowerType, TowerModel> = {
	ARCHER: ReplicatedStorage.assets.towers.archer.models.archer,
};
