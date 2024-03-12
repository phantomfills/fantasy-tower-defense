import { createProducer } from "@rbxts/reflex";
import { Possible } from "shared/modules/utils/possible";

interface EnemyHoverState {
	possibleEnemyHoverId: Possible<string>;
}

const initialState: EnemyHoverState = {
	possibleEnemyHoverId: {
		exists: false,
	},
};

export const enemyHoverSlice = createProducer(initialState, {
	setEnemyHoverId: (state, id: string) => ({
		...state,
		possibleEnemyHoverId: { exists: true, value: id },
	}),

	clearEnemyHoverId: (state) => ({ ...state, possibleEnemyHoverId: { exists: false } }),
});
