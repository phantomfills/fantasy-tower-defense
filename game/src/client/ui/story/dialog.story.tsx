import Roact from "@rbxts/roact";
import { Dialog } from "../game/dialog";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const dialog = (
		<Dialog
			visibleByDefault={true}
			text="Incoming armored dummies! Towers without the 'reinforced' trait will deal no damage to them! Quickly, upgrade your Archers to level 2 to take out these slow but menacing foes."
		/>
	);
	const root = createRoot(target);
	root.render(dialog);

	return () => {
		root.unmount();
	};
};
