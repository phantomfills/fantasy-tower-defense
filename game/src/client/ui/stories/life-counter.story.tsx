import Roact from "@rbxts/roact";
import { LifeCounter } from "../game/life-counter";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const lifeCounter = (
		<frame
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<LifeCounter lives={100} />
		</frame>
	);

	const root = createRoot(target);
	root.render(lifeCounter);

	return () => {
		root.unmount();
	};
};
