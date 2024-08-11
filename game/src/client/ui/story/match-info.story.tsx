import React from "@rbxts/react";
import { MatchInfo } from "../game/match-info";
import { createRoot } from "@rbxts/react-roblox";
import { RootProvider } from "client/store";

export = (target: Frame) => {
	const matchInfo = (
		<RootProvider>
			<MatchInfo />
		</RootProvider>
	);

	const root = createRoot(target);
	root.render(matchInfo);

	return () => {
		root.unmount();
	};
};
