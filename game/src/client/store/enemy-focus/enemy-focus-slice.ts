import { createProducer } from "@rbxts/reflex";
import { Possible } from "shared/modules/utils/possible";

interface EnemyFocusState {
	possibleEnemyFocusId: Possible<string>;
}

const initialState: EnemyFocusState = {
	possibleEnemyFocusId: {
		exists: false,
	},
};

export const enemyFocusSlice = createProducer(initialState, {
	setEnemyFocusId: (state, id: string) => ({
		...state,
		possibleEnemyFocusId: { exists: true, value: id },
	}),

	clearEnemyFocusId: (state) => ({ ...state, possibleEnemyFocusId: { exists: false } }),
});
