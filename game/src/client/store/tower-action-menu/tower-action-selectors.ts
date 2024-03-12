import { createSelector } from "@rbxts/reflex";
import { RootState } from "..";

export const getPossibleTowerId = createSelector(
	(state: RootState) => state.towerAction.towerId,
	(towerId) => {
		return towerId;
	},
);

export const getTowerIsNotFocused = (id: string) =>
	createSelector(
		(state: RootState) => state.towerAction.towerId,
		(towerId) => {
			return towerId.exists ? towerId.value !== id : true;
		},
	);
