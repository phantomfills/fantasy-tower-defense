import Roact from "@rbxts/roact";
import { createRoot } from "@rbxts/react-roblox";
import { CashLabel } from "../utils/cash-label";

export = (target: Frame) => {
	const cashLabel = (
		<frame
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<CashLabel value={100} size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 0, 0, 0)} />
		</frame>
	);

	const root = createRoot(target);
	root.render(cashLabel);

	return () => {
		root.unmount();
	};
};
