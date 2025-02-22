import React from "@rbxts/react";
import { TowerActionMenuFrame } from "../tower/tower-action-menu-frame";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerActionMenu = (
		<TowerActionMenuFrame
			owner="PhantomFills"
			name="Dummy Defect"
			money={5000}
			level={1}
			actions={{
				upgrade: {
					name: "Upgrade: $2000",
					call: () => {
						print("Upgrade!");
					},
				},
				sell: {
					name: "Sell: $500",
					call: () => {
						print("Sell!");
					},
				},
			}}
			close={() => {
				print("Close!");
			}}
			traits={["STEALTH", "REINFORCED"]}
			upgradeTitle="Bat Signal"
			upgradeDescription="Shine the bat signal to call for help!"
			upgradeCost={2000}
			health={100}
			maxHealth={100}
			ownTower={true}
		/>
	);

	const root = createRoot(target);
	root.render(towerActionMenu);

	return () => {
		root.unmount();
	};
};
