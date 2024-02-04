import Roact from "@rbxts/roact";
import { TowerActionMenu } from "../tower/tower-action-menu";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const towerActionMenu = <TowerActionMenu towerType="ARCHER" level={0} />;

	const root = createRoot(target);
	root.render(towerActionMenu);

	return () => {
		root.unmount();
	};
};
