import { SharedState } from "..";

export function selectMap(state: SharedState) {
	return state.map.map;
}

export function selectLives(state: SharedState) {
	return state.map.lives;
}

export function selectGameOver(state: SharedState) {
	return state.map.lives <= 0;
}
