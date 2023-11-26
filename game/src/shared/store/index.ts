import { CombineStates } from "@rbxts/reflex";
import { enemySlice } from "./enemy";
import { mapSlice } from "./map";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	enemy: enemySlice,
	map: mapSlice,
};
