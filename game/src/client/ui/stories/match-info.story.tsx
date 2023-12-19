import Roact from "@rbxts/roact";
import { MatchInfo } from "../game/match-info";
import { LifeCounter } from "../game/life-counter";
import { createRoot } from "@rbxts/react-roblox";
import { CashCounter } from "../game/cash-counter";

export = (target: Frame) => {
	const matchInfo = (
		<MatchInfo>
			<LifeCounter lives={1000} />
			<CashCounter value={1000} />
		</MatchInfo>
	);

	const root = createRoot(target);
	root.render(matchInfo);

	return () => {
		root.unmount();
	};
};
