import { RootState } from "..";

export function selectEnemyDetailViewType(state: RootState) {
	return state.settings.enemyDetailViewType;
}

export function selectMenuOpen(state: RootState) {
	return state.settings.menuOpen;
}
