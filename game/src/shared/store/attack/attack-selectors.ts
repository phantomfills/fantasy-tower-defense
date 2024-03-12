import { SharedState } from "..";

export function getAttacks(state: SharedState) {
	return state.attack.attacks;
}
