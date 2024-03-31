import Roact from "@rbxts/roact";
import { Dialog } from "../game/dialog";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const dialog = (
		<Dialog
			visible={true}
			text="Incoming armored dummies! Towers without the 'reinforced' trait will deal no damage to them! Quickly, upgrade your Archers to level 2 to take out these slow but menacing foes."
			totalTicksRequired={5}
			numberTicked={0}
			onTick={() => print("Ticked!")}
		/>
	);
	const root = createRoot(target);
	root.render(dialog);

	return () => {
		root.unmount();
	};
};
