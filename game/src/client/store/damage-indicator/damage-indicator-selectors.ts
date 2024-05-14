import { RootState } from "..";

export function selectDamageIndicators(state: RootState) {
	return state.damageIndicator;
}
