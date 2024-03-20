import { Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import { Tower } from "./tower-slice";
import { createSelector } from "@rbxts/reflex";

export function selectTowers(state: SharedState) {
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

function selectTowerLevel(id: string): (state: SharedState) => number | undefined {
	return createSelector(selectTower(id), (tower) => {
		return tower?.level;
	});
}

export function getPossibleTowerLevelFromId(id: string): (state: SharedState) => Possible<number> {
	return createSelector(selectTowerLevel(id), (level): Possible<number> => {
		return level !== undefined ? { exists: true, value: level } : { exists: false };
	});
}
