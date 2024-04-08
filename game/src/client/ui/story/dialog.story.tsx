import React from "@rbxts/react";
import { Dialog } from "../game/dialog";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const dialog = <Dialog />;
	const root = createRoot(target);
	root.render(dialog);

	return () => {
		root.unmount();
	};
};
