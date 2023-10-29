import Roact from "@rbxts/roact";
import { TowerPlacementMessage } from "../towers/tower-placement-message";
import { createRoot } from "@rbxts/react-roblox";
import { Frame } from "../utils/frame";

export = (target: Frame) => {
	const towerPlacementMessage = (
		<Frame
			size={new UDim2(0.15, 0, 0.2, 0)}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<TowerPlacementMessage towerType="ARCHER" />
		</Frame>
	);

	const root = createRoot(target);
	root.render(towerPlacementMessage);

	return () => {
		root.unmount();
	};
};
