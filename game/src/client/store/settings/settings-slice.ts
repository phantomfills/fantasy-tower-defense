import { createProducer } from "@rbxts/reflex";

export const ENEMY_DETAIL_VIEW_TYPE = ["HOVER", "CLOSEST"] as const;

export type EnemyDetailViewType = (typeof ENEMY_DETAIL_VIEW_TYPE)[number];

interface Settings {
	enemyDetailViewType: EnemyDetailViewType;
}

const initialState: Settings = {
	enemyDetailViewType: "CLOSEST",
};

export const settingsSlice = createProducer(initialState, {
	setEnemyDetailViewType: (state, enemyDetailViewType: EnemyDetailViewType) => ({
		...state,
		enemyDetailViewType,
	}),
});
