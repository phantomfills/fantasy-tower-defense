import { InferState, combineProducers } from "@rbxts/reflex";
import { enemySlice } from "./enemy/enemy-slice";
import { mapSlice } from "./map/map-slice";

export type RootState = InferState<typeof store>;

export function createStore() {
	const store = combineProducers({
		enemy: enemySlice,
		map: mapSlice,
	});

	return store;
}

export const store = createStore();
