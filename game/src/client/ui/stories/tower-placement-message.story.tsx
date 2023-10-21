import Roact from "@rbxts/roact";
import { TowerPlacementMessage } from "../towers/tower-placement-message";
import { createRoot } from "@rbxts/react-roblox";
import { FollowMouse } from "../utils/follow-mouse";

export = (target: Frame) => {
	const towerPlacementMessage = (
		<FollowMouse size={new UDim2(0.15, 0, 0.2, 0)}>
			<TowerPlacementMessage towerType="ARCHER" />
		</FollowMouse>
	);

	const root = createRoot(target);
	root.render(towerPlacementMessage);

	return () => {
		root.unmount();
	};
};
