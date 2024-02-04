import { RootState } from "..";

export function getPossibleTowerId(state: RootState) {
	return state.towerAction.towerId;
}
