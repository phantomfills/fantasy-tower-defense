import { TowerType } from "./tower-type";

const towerTypeToDisplayNameMap: Record<TowerType, string> = {
	DUMMY_DEFECT: "Defect",
	ARCHER: "Archer",
	OFFICER: "Officer",
};

export function getTowerDisplayNameFromType(_type: TowerType): string {
	return towerTypeToDisplayNameMap[_type];
}
