import { SharedState } from "..";

export function selectMap(state: SharedState) {
	return state.map.map;
}
