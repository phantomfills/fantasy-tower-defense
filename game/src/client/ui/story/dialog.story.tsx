import React from "@rbxts/react";
import { DialogFrame } from "../game/dialog";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const dialog = <DialogFrame dialogTextProps={{ text: "Hello, world!", countdownTime: 10 }} />;
	const root = createRoot(target);
	root.render(dialog);

	return () => {
		root.unmount();
	};
};
