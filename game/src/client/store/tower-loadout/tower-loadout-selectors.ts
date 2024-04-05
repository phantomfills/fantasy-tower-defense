import { RootState } from "..";

export function selectTowerLoadout(state: RootState) {
	return state.towerLoadout.towers;
}

export function selectPossibleTowerPlacement(state: RootState) {
	return state.towerLoadout.possibleTowerPlacement;
}
