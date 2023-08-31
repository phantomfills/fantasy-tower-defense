import Roact from "@rbxts/roact";
import { createRoot } from "@rbxts/react-roblox";
import { HotbarFrame } from "./hotbar-frame";

export = (target: Frame): (() => void) => {
	const hotbar = <HotbarFrame slots={5} />;

	const root = createRoot(target);
	root.render(hotbar);

	return () => {
		root.unmount();
	};
};
