import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { SettingsMenu } from "../game/settings-menu";

export = (target: Frame) => {
	const settingsMenu = <SettingsMenu />;

	const root = createRoot(target);
	root.render(settingsMenu);

	return () => {
		root.unmount();
	};
};
