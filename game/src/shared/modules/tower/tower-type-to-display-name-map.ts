import { TowerType } from "./tower-type";

const towerTypeToDisplayNameMap: Record<TowerType, string> = {
	ARCHER: "Vanessa, Archer",
};

export function getTowerDisplayNameFromType(_type: TowerType): string {
	return towerTypeToDisplayNameMap[_type];
}
