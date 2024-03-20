import { RootState } from "..";

export function selectEnemyDetailViewType(state: RootState) {
	return state.settings.enemyDetailViewType;
}
