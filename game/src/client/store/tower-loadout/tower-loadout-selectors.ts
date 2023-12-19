import { RootState } from "..";

export function getTowerLoadout(state: RootState) {
	return state.towerLoadout.towers;
}

export function getPossibleTowerPlacement(state: RootState) {
	return state.towerLoadout.possibleTowerPlacement;
}
