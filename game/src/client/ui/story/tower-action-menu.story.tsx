import Roact from "@rbxts/roact";
import { TowerActionMenu } from "../tower/tower-action-menu";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerActionMenu = (
		<TowerActionMenu
			name="Batman"
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
			upgradeTitle="Bat Signal"
			upgradeDescription="Shine the bat signal to call for help!"
		/>
	);

	const root = createRoot(target);
	root.render(towerActionMenu);

	return () => {
		root.unmount();
	};
};
