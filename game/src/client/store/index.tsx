import { InferState, combineProducers, createBroadcastReceiver } from "@rbxts/reflex";
import { towerLoadoutSlice } from "./tower-loadout";
import { ReflexProvider } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { Events } from "client/network";
import { slices } from "shared/store";
import { enemyHoverSlice } from "./enemy-hover";
import { towerActionSlice } from "./tower-action-menu-slice";

export type RootState = InferState<typeof producer>;

export const producer = combineProducers({
	...slices,
	towerLoadout: towerLoadoutSlice,
	enemyHover: enemyHoverSlice,
	towerAction: towerActionSlice,
});

export function RootProvider(props: Roact.PropsWithChildren) {
	return <ReflexProvider producer={producer}>{props.children}</ReflexProvider>;
}

const reciever = createBroadcastReceiver({
	start: () => {
		Events.start.fire();
	},
});

Events.dispatch.connect((actions) => {
	reciever.dispatch(actions);
});

producer.applyMiddleware(reciever.middleware);
