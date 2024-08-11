import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { SettingsMenu } from "../game/settings-menu";
import { RootProvider } from "client/store";

export = (target: Frame) => {
	const settingsMenu = (
		<RootProvider>
			<SettingsMenu />
		</RootProvider>
	);

	const root = createRoot(target);
	root.render(settingsMenu);

	return () => {
		root.unmount();
	};
};
