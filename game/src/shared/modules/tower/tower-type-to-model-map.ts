import { ReplicatedStorage } from "@rbxts/services";
import { TowerType } from "./tower-type";
import { TowerModel } from "./tower-model";
import { DeepReadonly } from "@rbxts/reflex";

const assets = ReplicatedStorage.assets;
const dummyDefectModels = assets.towers.dummy_defect.models;
const archerModels = assets.towers.archer.models;
const officerModels = assets.towers.officer;

const towerTypeToModelsMap = {
	DUMMY_DEFECT: [
		dummyDefectModels.level_0,
		dummyDefectModels.level_1,
		dummyDefectModels.level_2,
		dummyDefectModels.level_3,
		dummyDefectModels.level_4,
		dummyDefectModels.level_5,
	],
	ARCHER: [
		archerModels.level_0,
		archerModels.level_1,
		archerModels.level_2,
		archerModels.level_3,
		archerModels.level_4,
		archerModels.level_5,
	],
	OFFICER: [
		officerModels.level_0,
		officerModels.level_1,
		officerModels.level_2,
		officerModels.level_3,
		officerModels.level_4,
		officerModels.level_5,
	],
} as const satisfies DeepReadonly<Record<TowerType, TowerModel[]>>;

export function getTowerModel<T extends TowerType, U extends number>(
	towerType: T,
	level: U,
): (typeof towerTypeToModelsMap)[T][U] {
	return towerTypeToModelsMap[towerType][level].Clone() as (typeof towerTypeToModelsMap)[T][U];
}
