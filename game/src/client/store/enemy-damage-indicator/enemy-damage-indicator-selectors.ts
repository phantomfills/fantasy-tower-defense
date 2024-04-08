import { RootState } from "..";

export function selectEnemyDamageIndicators(state: RootState) {
	return state.enemyDamageIndicator;
}
