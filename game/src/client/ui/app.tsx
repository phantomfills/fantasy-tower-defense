import Roact, { Suspense } from "@rbxts/roact";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./towers/tower-loadout";
import { LifeCounter } from "./game/life-counter";
import { CashLabel } from "./game/cash-label";
import { FollowMouse } from "./utils/follow-mouse";
import { TowerPlacementMessage } from "./towers/tower-placement-message";
import { useSelector } from "@rbxts/react-reflex";
import { getPossibleTowerPlacement, getTowers } from "client/providers/root-provider";
import { TowerSlot } from "./towers/tower-slot";
import { MatchInfo } from "./game/match-info";
import { CashCounter } from "./game/cash-counter";

export function App() {
	const towers = useSelector(getTowers);
	const possibleTowerPlacement = useSelector(getPossibleTowerPlacement);

	return (
		<Panel>
			<TowerLoadout visible={!possibleTowerPlacement.exists}>
				{towers.map((tower) => (
					<TowerSlot number={tower.number} icon={tower.icon} cost={tower.cost} callback={tower.callback} />
				))}
			</TowerLoadout>

			{possibleTowerPlacement.exists && (
				<FollowMouse size={new UDim2(0.15, 0, 0.2, 0)}>
					<TowerPlacementMessage towerType={possibleTowerPlacement.value.towerType} />
				</FollowMouse>
			)}

			<MatchInfo>
				<LifeCounter lives={1000} />
				<CashCounter value={1000} />
			</MatchInfo>
		</Panel>
	);
}
