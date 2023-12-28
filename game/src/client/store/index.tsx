import { InferState, combineProducers, createBroadcastReceiver } from "@rbxts/reflex";
import { towerLoadoutSlice } from "./tower-loadout";
import { ReflexProvider } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { Events } from "client/network";
import { slices } from "shared/store";
import { enemyHoverSlice } from "./enemy-hover";

export type RootState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
	towerLoadout: towerLoadoutSlice,
	enemyHover: enemyHoverSlice,
});

export function RootProvider(props: Roact.PropsWithChildren) {
	return <ReflexProvider producer={store}>{props.children}</ReflexProvider>;
}

const reciever = createBroadcastReceiver({
	start: () => {
		Events.start.fire();
	},
});

Events.dispatch.connect((actions) => {
	reciever.dispatch(actions);
});

store.applyMiddleware(reciever.middleware);
