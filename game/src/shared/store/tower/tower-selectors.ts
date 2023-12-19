import { SharedState } from "..";

export function getTowers(state: SharedState) {
	return state.tower.towers;
}

export function getAttacks(state: SharedState) {
	return state.tower.attacks;
}
