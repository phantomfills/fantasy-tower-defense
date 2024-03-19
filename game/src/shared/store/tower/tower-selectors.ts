import { Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import { Tower } from "./tower-slice";
import { createSelector } from "@rbxts/reflex";
import { Attack } from "shared/modules/attack";

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

export function getPossibleAttackForTower(id: string): (state: SharedState) => Possible<Attack> {
	return createSelector(getPossibleTowerFromId(id), (possibleTower) => {
		return possibleTower.exists ? possibleTower.value.attack : { exists: false };
	});
}

export function getAttackId(attack: Attack) {
	return attack.id;
}

export function selectAttacks(state: SharedState): Record<string, Attack> {
	const towers = selectTowers(state);
	const attacks: Record<string, Attack> = {};
	for (const [id, tower] of pairs(towers)) {
		if (tower && tower.attack.exists) {
			attacks[id] = tower.attack.value;
		}
	}
	return attacks;
}
