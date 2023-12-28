import { Possible } from "shared/modules/util/possible";
import { SharedState } from "..";
import { Tower } from "./tower-slice";

export function getTowers(state: SharedState) {
	return state.tower.towers;
}

export function towerDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => !state.tower.towers[id];
}

export function getTowerFromId(id: string): (state: SharedState) => Possible<Tower> {
	return (state) => {
		const tower = state.tower.towers[id];
		return tower ? { exists: true, value: tower } : { exists: false };
	};
}

export function getAttacks(state: SharedState) {
	return state.tower.attacks;
}
