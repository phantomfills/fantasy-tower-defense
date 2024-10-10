import React from "@rbxts/react";
import { DialogFrame } from "../game/dialog";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const dialog = <DialogFrame time={10} alpha={0.5} text={"Hello, world!"} />;
	const root = createRoot(target);
	root.render(dialog);

	return () => {
		root.unmount();
	};
};
