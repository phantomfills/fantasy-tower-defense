import React from "@rbxts/react";
import { RootProvider } from "client/store";
import { Objectives } from "../game/objectives";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const objectives = (
		<RootProvider>
			<Objectives />
		</RootProvider>
	);

	const root = createRoot(target);
	root.render(objectives);

	return () => {
		root.unmount();
	};
};
