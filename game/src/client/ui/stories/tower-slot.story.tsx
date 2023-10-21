// write a hoarcekat story for tower-slot.tsx

import Roact from "@rbxts/roact";
import { TowerSlot } from "../towers/tower-slot";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerSlot = (
		<frame Size={new UDim2(0, 100, 0, 100)} Position={new UDim2(0.5, -50, 0.5, -50)} BackgroundTransparency={1}>
			<TowerSlot
				icon="rbxassetid://1022613008"
				number={1}
				callback={() => {
					print("hello, world!");
				}}
				cost={100}
			/>
		</frame>
	);

	const root = createRoot(target);
	root.render(towerSlot);

	return () => {
		root.unmount();
	};
};
