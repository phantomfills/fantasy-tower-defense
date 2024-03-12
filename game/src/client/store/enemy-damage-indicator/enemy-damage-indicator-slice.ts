import Object from "@rbxts/object-utils";
import { createProducer } from "@rbxts/reflex";

interface EnemyDamageIndicatorState {
	[attackId: string]:
		| {
				damage: number;
				position: Vector3;
				spawnTime: number;
		  }
		| undefined;
}

const initialState: EnemyDamageIndicatorState = {};

export const enemyDamageIndicatorSlice = createProducer(initialState, {
	addDamageIndicator: (
		state,
		attackId: string,
		damage: number,
		position: Vector3,
		currentTimeInMilliseconds: number,
	) => ({
		...state,
		[attackId]: {
			damage,
			position,
			spawnTime: currentTimeInMilliseconds,
		},
	}),

	tickDamageIndicators: (state, currentTimeInMilliseconds: number) => {
		return Object.fromEntries(
			Object.entries(state).filter(([, indicator]) => {
				if (indicator === undefined) {
					return false;
				}

				return currentTimeInMilliseconds - indicator.spawnTime < 500;
			}),
		);
	},
});
