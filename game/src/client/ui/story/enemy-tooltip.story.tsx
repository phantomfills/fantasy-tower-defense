import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { EnemyTooltip } from "../enemy/enemy-tooltip";
import { Frame } from "../utils/frame";

export = (target: Frame) => {
	const enemyTooltip = (
		<Frame position={new UDim2(0.5, 0, 0.5, 0)} size={new UDim2(0, 175, 0, 75)}>
			<EnemyTooltip enemyType="GUARD_DUMMY" health={160} />
		</Frame>
	);

	const root = createRoot(target);
	root.render(enemyTooltip);

	return () => root.unmount();
};
