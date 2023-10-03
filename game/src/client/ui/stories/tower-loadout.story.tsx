import Roact from "@rbxts/roact";
import { TowerLoadout } from "../tower-loadout";
import { createRoot } from "@rbxts/react-roblox";

const printTowerSlotNumber = (slotNumber: number) => {
	return () => print(slotNumber);
};

export = (target: Frame) => {
	const towerSlot = (
		<TowerLoadout
			towerSlots={[
				{ number: 1, callback: printTowerSlotNumber(1), icon: "rbxassetid://7618319705" },
				{ number: 2, callback: printTowerSlotNumber(2), icon: "rbxassetid://139437521" },
				{ number: 3, callback: printTowerSlotNumber(3), icon: "rbxassetid://7165896576" },
			]}
		/>
	);

	const root = createRoot(target);
	root.render(towerSlot);

	return () => {
		root.unmount();
	};
};
