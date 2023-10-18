import Roact from "@rbxts/roact";
import { TowerPlacementMessage } from "../tower-placement-message";
import { createRoot } from "@rbxts/react-roblox";
import { FollowMouse } from "../follow-mouse";

export = (target: Frame) => {
	const towerPlacementMessage = (
		<FollowMouse>
			<TowerPlacementMessage towerType="ARCHER" />
		</FollowMouse>
	);

	const root = createRoot(target);
	root.render(towerPlacementMessage);

	return () => {
		root.unmount();
	};
};
