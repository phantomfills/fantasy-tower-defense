import { InferState, combineProducers, createBroadcaster } from "@rbxts/reflex";
import { Events } from "server/network";
import { slices } from "shared/store";

export type RootState = InferState<typeof store>;

export function createStore() {
	const store = combineProducers({
		...slices,
	});

	return store;
}

export const store = createStore();

const broadcaster = createBroadcaster({
	producers: { enemy: slices.enemy, tower: slices.tower },

	dispatch: (player, actions) => {
		Events.dispatch.fire(player, actions);
	},

	hydrateRate: 60,
});

Events.start.connect((player) => {
	broadcaster.start(player);
});

store.applyMiddleware(broadcaster.middleware);
