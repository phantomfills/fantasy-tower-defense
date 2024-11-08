import { createProducer } from "@rbxts/reflex";
import { Possible } from "shared/modules/utils/possible";

interface TowerActionState {
	towerId: Possible<string>;
}

export const initialState: TowerActionState = {
	towerId: {
		exists: false,
	},
};

export const towerActionSlice = createProducer(initialState, {
	setTowerId: (state, id: string) => ({
		...state,
		towerId: { exists: true, value: id },
	}),

	clearTowerId: (state) => ({ ...state, towerId: { exists: false } }),
});
