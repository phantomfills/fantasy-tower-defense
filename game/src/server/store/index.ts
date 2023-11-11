import { InferState, combineProducers } from "@rbxts/reflex";
import { enemySlice } from "./enemy/enemy-slice";

export type RootState = InferState<typeof store>;

export function createStore() {
	const store = combineProducers({
		enemy: enemySlice,
	});

	return store;
}

export const store = createStore();
