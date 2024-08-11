import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { EnemyTooltip } from "../enemy/enemy-tooltip";
import { RootProvider } from "client/store";
import { Group } from "../utils/group";

export = (target: Frame) => {
	const enemyTooltip = (
		<RootProvider>
			<Group position={new UDim2(0.5, 0, 0.5, 0)} size={new UDim2(0, 175, 0, 75)}>
				<EnemyTooltip enemyType="GUARD_DUMMY" health={160} />
			</Group>
		</RootProvider>
	);

	const root = createRoot(target);
	root.render(enemyTooltip);

	return () => root.unmount();
};
