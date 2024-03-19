import { Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import { Tower } from "./tower-slice";
import { createSelector } from "@rbxts/reflex";

export function getTowers(state: SharedState) {
	return state.tower.towers;
}

export function towerDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => !state.tower.towers[id];
}

function selectTower(id: string): (state: SharedState) => Tower | undefined {
	return (state) => state.tower.towers[id];
}

export function getPossibleTowerFromId(id: string): (state: SharedState) => Possible<Tower> {
	return createSelector(selectTower(id), (tower) => {
		return tower ? { exists: true, value: tower } : { exists: false };
	});
}

export function getPossibleTowerLevelFromId(id: string): (state: SharedState) => Possible<number> {
	return createSelector(getPossibleTowerFromId(id), (possibleTower): Possible<number> => {
		return possibleTower.exists ? { exists: true, value: possibleTower.value.level } : { exists: false };
	});
}
