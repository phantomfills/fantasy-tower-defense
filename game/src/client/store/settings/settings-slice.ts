import { createProducer } from "@rbxts/reflex";

export const ENEMY_DETAIL_VIEW_TYPE = ["HOVER", "CLOSEST"] as const;

export type EnemyDetailViewType = (typeof ENEMY_DETAIL_VIEW_TYPE)[number];

interface Settings {
	enemyDetailViewType: EnemyDetailViewType;
	menuOpen: boolean;
}

const initialState: Settings = {
	enemyDetailViewType: "CLOSEST",
	menuOpen: false,
};

export const settingsSlice = createProducer(initialState, {
	setEnemyDetailViewType: (state, enemyDetailViewType: EnemyDetailViewType) => ({
		...state,
		enemyDetailViewType,
	}),

	toggleMenuOpen: (state) => ({
		...state,
		menuOpen: !state.menuOpen,
	}),
});
