import { createProducer } from "@rbxts/reflex";
import { TowerType } from "shared/modules/tower/tower-type";
import { possible } from "shared/modules/utils/possible";

export interface Tower {
	towerType: TowerType;
	cframe: CFrame;
	level: number;
	owner: string;
	health: number;
	lastAttackTimestamp: number;
	lastHealTimestamp: number;
}

export type TowerState = {
	towers: Record<string, Tower | undefined>;
};

const initialState: TowerState = {
	towers: {},
};

export const towerSlice = createProducer(initialState, {
	addTower: (state, id: string, tower: Tower) => {
		return { ...state, towers: { ...state.towers, [id]: tower } };
	},

	upgradeTower: (state, id: string) => {
		const possibleTower = possible<Tower>(state.towers[id]);
		if (!possibleTower.exists) throw `Tower with id ${id} does not exist`;

		const tower = possibleTower.value;
		return { ...state, towers: { ...state.towers, [id]: { ...tower, level: tower.level + 1 } } };
	},

	destroyTower: (state, id: string) => {
		return { ...state, towers: { ...state.towers, [id]: undefined } };
	},

	setLastAttackTimestamp: (state, id: string, timestamp: number) => {
		const possibleTower = possible<Tower>(state.towers[id]);
		if (!possibleTower.exists) throw `Tower with id ${id} does not exist`;

		const tower = possibleTower.value;
		return { ...state, towers: { ...state.towers, [id]: { ...tower, lastAttackTimestamp: timestamp } } };
	},

	damageTower: (state, id: string, damage: number) => {
		const possibleTower = possible<Tower>(state.towers[id]);
		if (!possibleTower.exists) throw `Tower with id ${id} does not exist`;

		const tower = possibleTower.value;
		return { ...state, towers: { ...state.towers, [id]: { ...tower, health: tower.health - damage } } };
	},

	healTower: (state, id: string, heal: number) => {
		const possibleTower = possible<Tower>(state.towers[id]);
		if (!possibleTower.exists) throw `Tower with id ${id} does not exist`;

		const tower = possibleTower.value;
		return { ...state, towers: { ...state.towers, [id]: { ...tower, health: tower.health + heal } } };
	},

	setLastHealTimestamp: (state, id: string, timestamp: number) => {
		const possibleTower = possible<Tower>(state.towers[id]);
		if (!possibleTower.exists) throw `Tower with id ${id} does not exist`;

		const tower = possibleTower.value;
		return { ...state, towers: { ...state.towers, [id]: { ...tower, lastHealTimestamp: timestamp } } };
	},

	clearTowers: (state) => ({ ...state, towers: {} }),
});
