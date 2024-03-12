import { createProducer } from "@rbxts/reflex";
import { TowerType } from "shared/modules/tower/tower-type";
import { Attack } from "shared/modules/attack";
import { possible } from "shared/modules/utils/possible";

export interface Tower {
	towerType: TowerType;
	cframe: CFrame;
	level: number;
	owner: string;
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
});
