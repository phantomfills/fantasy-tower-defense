import { TowerModel } from "./tower-model";
import { TowerType } from "./tower-type";
import { ReplicatedStorage } from "@rbxts/services";

const archerModel = ReplicatedStorage.assets.towers.archer.models.archer;

export const towerTypeToModelMap: Record<TowerType, TowerModel> = {
	ARCHER: archerModel,
} as const;
