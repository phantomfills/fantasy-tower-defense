import { UseProducerHook, useProducer } from "@rbxts/react-reflex";
import { createProducer } from "@rbxts/reflex";
import { TowerSlotProps } from "client/ui/tower-slot";
import { Possible } from "shared/modules/possible";
import { TowerType } from "shared/modules/tower-type";

interface TowerPlacement {
	towerType: TowerType;
}

export interface State {
	towers: TowerSlotProps[];
	possibleTowerPlacement: Possible<TowerPlacement>;
}

const initialState: State = {
	towers: [],
	possibleTowerPlacement: {
		exists: false,
	},
};

export const rootProducer = createProducer(initialState, {
	addTower: (state, tower: TowerSlotProps) => ({ ...state, towers: [...state.towers, tower] }),

	setTowerPlacement: (state, towerType: TowerType) => ({
		...state,
		possibleTowerPlacement: { exists: true, value: { towerType: towerType } },
	}),

	clearTowerPlacement: (state) => ({ ...state, possibleTowerPlacement: { exists: false } }),
});

export const getTowers = (state: State) => state.towers;
export const getPossibleTowerPlacement = (state: State) => state.possibleTowerPlacement;
export type RootProducer = typeof rootProducer;

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
