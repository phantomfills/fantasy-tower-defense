import { TowerType } from "./tower-type";

const towerTypeToDisplayNameMap: Record<TowerType, string> = {
	DUMMY_DEFECT: "Dummy Defect",
	ARCHER: "Archer",
};

export function getTowerDisplayNameFromType(_type: TowerType): string {
	return towerTypeToDisplayNameMap[_type];
}
