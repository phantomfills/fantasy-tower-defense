import { createProducer } from "@rbxts/reflex";

export const ENEMY_DETAIL_VIEW_TYPE = ["HOVER", "CLOSEST"] as const;
export type EnemyDetailViewType = (typeof ENEMY_DETAIL_VIEW_TYPE)[number];

export const DIALOG_VISIBILITY_TYPE = ["YES", "NO"] as const;
export type DialogVisibilityType = (typeof DIALOG_VISIBILITY_TYPE)[number];

interface Settings {
	enemyDetailViewType: EnemyDetailViewType;
	dialogVisibilityType: DialogVisibilityType;
}

const initialState: Settings = {
	enemyDetailViewType: "CLOSEST",
	dialogVisibilityType: "YES",
};

export const settingsSlice = createProducer(initialState, {
	setEnemyDetailViewType: (state, enemyDetailViewType: EnemyDetailViewType) => ({
		...state,
		enemyDetailViewType,
	}),

	setDialogVisibilityType: (state, dialogVisibilityType: DialogVisibilityType) => ({
		...state,
		dialogVisibilityType,
	}),
});
