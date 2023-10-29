import Roact from "@rbxts/roact";
import { MatchInfo } from "../game/match-info";
import { LifeCounter } from "../game/life-counter";
import { CashLabel } from "../game/cash-label";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const matchInfo = (
		<MatchInfo>
			<LifeCounter lives={1000} />
			<CashLabel value={1000} />
		</MatchInfo>
	);

	const root = createRoot(target);
	root.render(matchInfo);

	return () => {
		root.unmount();
	};
};
