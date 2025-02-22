import React from "@rbxts/react";
import { TowerLoadout } from "../tower/tower-loadout";
import { createRoot } from "@rbxts/react-roblox";
import { TowerSlot } from "../tower/tower-slot";

function getPrintTowerSlotNumberCallback(slotNumber: number) {
	return () => print(slotNumber);
}

export = (target: Frame) => {
	const towerSlot = (
		<TowerLoadout>
			<TowerSlot
				number={1}
				icon="rbxassetid://7618319705"
				cost={100}
				callback={getPrintTowerSlotNumberCallback(1)}
			/>
		</TowerLoadout>
	);

	const root = createRoot(target);
	root.render(towerSlot);

	return () => {
		root.unmount();
	};
};
