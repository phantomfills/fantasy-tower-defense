import React from "@rbxts/react";
import { LifeCounter } from "../game/life-counter";
import { createRoot } from "@rbxts/react-roblox";
import { Frame } from "../utils/frame";

export = (target: Frame) => {
	const lifeCounter = (
		<Frame size={new UDim2(0, 100, 0, 50)} position={new UDim2(0.5, 0, 0.5, 0)} anchorPoint={new Vector2(0.5, 0.5)}>
			<LifeCounter lives={100} />
		</Frame>
	);

	const root = createRoot(target);
	root.render(lifeCounter);

	return () => {
		root.unmount();
	};
};
