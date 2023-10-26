// write a hoarcekat story for tower-slot.tsx

import Roact from "@rbxts/roact";
import { TowerSlot } from "../towers/tower-slot";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerSlot = (
		<TowerSlot
			icon="rbxassetid://1022613008"
			number={1}
			callback={() => {
				print("hello, world!");
			}}
			cost={100}
		/>
	);

	const root = createRoot(target);
	root.render(towerSlot);

	return () => {
		root.unmount();
	};
};
