import Roact from "@rbxts/roact";
import { Hotbar } from "./hotbar";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame): (() => void) => {
	const hotbar = <Hotbar slots={5} />;

	const root = createRoot(target);
	root.render(hotbar);

	return () => {
		root.unmount();
	};
};
