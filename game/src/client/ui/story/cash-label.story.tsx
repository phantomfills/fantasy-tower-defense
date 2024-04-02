import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { CashLabel } from "../game/cash-label";
import { Frame } from "../utils/frame";

export = (target: Frame) => {
	const cashLabel = (
		<Frame size={new UDim2(0, 100, 0, 50)} position={new UDim2(0.5, 0, 0.5, 0)} anchorPoint={new Vector2(0.5, 0.5)}>
			<CashLabel value={100} size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 0, 0, 0)} />
		</Frame>
	);

	const root = createRoot(target);
	root.render(cashLabel);

	return () => {
		root.unmount();
	};
};
