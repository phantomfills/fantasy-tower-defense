import { createSelector } from "@rbxts/reflex";
import { RootState } from "..";

export const getPossibleTowerId = createSelector(
	(state: RootState) => state.towerAction.towerId,
	(towerId) => {
		print(towerId);
		return towerId;
	},
);
