import { Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import { Tower } from "./tower-slice";
import { createSelector } from "@rbxts/reflex";
import Object from "@rbxts/object-utils";

export function selectTowers(state: SharedState) {
	return state.tower.towers;
}

export function towerDoesNotExistFromId(id: string): (state: SharedState) => boolean {
	return (state) => !state.tower.towers[id];
}

function selectTower(id: string): (state: SharedState) => Tower | undefined {
	return (state) => state.tower.towers[id];
}

export function selectPossibleTowerFromId(id: string): (state: SharedState) => Possible<Tower> {
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

export function selectClosestTowerIdToPosition(position: Vector3): (state: SharedState) => Possible<string> {
	return createSelector(selectTowers, (towers) => {
		const towersByDistance = Object.keys(towers).sort((prevTowerId, towerId) => {
			const prevTower = towers[prevTowerId];
			if (!prevTower) return false;

			const tower = towers[towerId];
			if (!tower) return true;

			return position.sub(prevTower.cframe.Position).Magnitude < position.sub(tower.cframe.Position).Magnitude;
		});

		if (towersByDistance.size() === 0) return { exists: false };
		return { exists: true, value: towersByDistance[0] };
	});
}

export function selectTowerPosition(id: string): (state: SharedState) => Possible<Vector3> {
	return createSelector(selectTower(id), (tower) => {
		return tower ? { exists: true, value: tower.cframe.Position } : { exists: false };
	});
}
