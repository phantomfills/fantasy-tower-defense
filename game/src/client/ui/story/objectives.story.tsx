import React from "@rbxts/react";
import { RootProvider } from "client/store";
import { ObjectivesPage } from "../game/objectives";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const objectives = (
		<RootProvider>
			<ObjectivesPage />
		</RootProvider>
	);

	const root = createRoot(target);
	root.render(objectives);

	return () => {
		root.unmount();
	};
};
