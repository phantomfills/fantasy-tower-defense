import React from "@rbxts/react";
import { InferState, combineProducers, createBroadcastReceiver } from "@rbxts/reflex";
import { towerLoadoutSlice } from "./tower-loadout";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Events } from "client/network";
import { slices } from "shared/store";
import { towerActionSlice } from "./tower-action-menu";
import { damageIndicatorSlice } from "./damage-indicator";
import { settingsSlice } from "./settings";
import { pageSlice } from "./page";

export type RootState = InferState<typeof producer>;

export const producer = combineProducers({
	...slices,
	towerLoadout: towerLoadoutSlice,
	towerAction: towerActionSlice,
	damageIndicator: damageIndicatorSlice,
	settings: settingsSlice,
	page: pageSlice,
});

export function RootProvider(props: React.PropsWithChildren) {
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
