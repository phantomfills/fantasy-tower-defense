import { createProducer } from "@rbxts/reflex";

type EnemyDetailView = "HOVER" | "CLOSEST";

interface Settings {
	enemyDetailViewType: EnemyDetailView;
}

const initialState: Settings = {
	enemyDetailViewType: "CLOSEST",
};

export const settingsSlice = createProducer(initialState, {
	setEnemyDetailViewType: (state, enemyDetailViewType: EnemyDetailView) => ({
		...state,
		enemyDetailViewType,
	}),
});
