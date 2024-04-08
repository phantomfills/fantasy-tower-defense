import { createSelector } from "@rbxts/reflex";
import { RootState } from "..";
import { possible } from "shared/modules/utils/possible";
import { Tower } from "shared/store/tower";

export const selectPossibleTowerId = createSelector(
	(state: RootState) => state.towerAction.towerId,
	(towerId) => {
		return towerId;
	},
);
export const selectTowerIsNotFocused = (id: string) =>
	createSelector(
		(state: RootState) => state.towerAction.towerId,
		(towerId) => {
			return towerId.exists ? towerId.value !== id : true;
		},
	);
