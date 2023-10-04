import Roact from "@rbxts/roact";
import { LifeCounter } from "../life-counter";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const lifeCounter = (
		<frame
			Size={new UDim2(0, 150, 0, 75)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<LifeCounter lives={3} />
		</frame>
	);

	const root = createRoot(target);
	root.render(lifeCounter);

	return () => {
		root.unmount();
	};
};
