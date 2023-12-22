import { createProducer } from "@rbxts/reflex";
import { TowerSlotProps } from "client/ui/tower/tower-slot";
import { TowerType } from "shared/modules/tower/tower-type";
import { Possible } from "shared/modules/util/possible";

export interface TowerPlacement {
	towerType: TowerType;
}

export interface TowerLoadoutState {
	towers: TowerSlotProps[];
	possibleTowerPlacement: Possible<TowerPlacement>;
}

const initialState: TowerLoadoutState = {
	towers: [],
	possibleTowerPlacement: {
		exists: false,
	},
};

export const towerLoadoutSlice = createProducer(initialState, {
	addTowerSlot: (state, tower: TowerSlotProps) => ({ ...state, towers: [...state.towers, tower] }),

	setTowerPlacement: (state, towerType: TowerType) => ({
		...state,
		possibleTowerPlacement: { exists: true, value: { towerType: towerType } },
	}),

	clearTowerPlacement: (state) => ({ ...state, possibleTowerPlacement: { exists: false } }),
});
