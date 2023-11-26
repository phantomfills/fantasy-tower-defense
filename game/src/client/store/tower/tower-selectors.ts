import { RootState } from "..";

export function getTowers(state: RootState) {
	return state.tower.towers;
}

export function getPossibleTowerPlacement(state: RootState) {
	return state.tower.possibleTowerPlacement;
}
