import React from "@rbxts/react";
import { TowerPlacementMessage } from "../tower/tower-placement-message";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerPlacementMessage = <TowerPlacementMessage />;

	const root = createRoot(target);
	root.render(towerPlacementMessage);

	return () => {
		root.unmount();
	};
};
