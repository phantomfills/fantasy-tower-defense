import { TowerType } from "./tower-type";

const towerTypeToDisplayNameMap: Record<TowerType, string> = {
	ARCHER: "Archer",
};

export function getTowerDisplayNameFromType(_type: TowerType): string {
	return towerTypeToDisplayNameMap[_type];
}
