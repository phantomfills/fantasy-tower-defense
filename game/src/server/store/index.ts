import { InferState, combineProducers, createBroadcaster } from "@rbxts/reflex";
import { Events } from "server/network";
import { slices } from "shared/store";

export type RootState = InferState<typeof producer>;

function createProducer() {
	const store = combineProducers({
		...slices,
	});

	return store;
}

export const producer = createProducer();

const broadcaster = createBroadcaster({
	producers: slices,

	dispatch: (player, actions) => {
		Events.dispatch.fire(player, actions);
	},

	hydrateRate: 120,
});

Events.start.connect((player) => {
	broadcaster.start(player);
});

producer.applyMiddleware(broadcaster.middleware);
