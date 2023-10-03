import Roact from "@rbxts/roact";
import { createRoot } from "@rbxts/react-roblox";
import { HotbarFrame } from "./hotbar-frame";

export = (target: Frame): (() => void) => {
	const hotbar = (
		<HotbarFrame
			towers={[
				{
					placementImageId: 139656808,
					callback: () => {
						print("hello, world!");
					},
				},
			]}
		/>
	);

	const root = createRoot(target);
	root.render(hotbar);

	return () => {
		root.unmount();
	};
};
