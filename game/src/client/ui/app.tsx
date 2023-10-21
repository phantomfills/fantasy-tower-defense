import Roact from "@rbxts/roact";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./towers/tower-loadout";
import { LifeCounter } from "./game/life-counter";
import { CashLabel } from "./utils/cash-label";
import { FollowMouse } from "./utils/follow-mouse";
import { TowerPlacementMessage } from "./towers/tower-placement-message";
import { useSelector } from "@rbxts/react-reflex";
import { getPossibleTowerPlacement, getTowers } from "client/providers/root-provider";

export function App() {
	const towers = useSelector(getTowers);
	const possibleTowerPlacement = useSelector(getPossibleTowerPlacement);

	return (
		<Panel>
			<TowerLoadout towerSlots={towers} />

			{possibleTowerPlacement.exists && (
				<FollowMouse size={new UDim2(0.15, 0, 0.2, 0)}>
					<TowerPlacementMessage towerType={possibleTowerPlacement.value.towerType} />
				</FollowMouse>
			)}

			<frame Size={new UDim2(0.1, 0, 1, -46)} Position={new UDim2(0.9, -10, 0, 36)} BackgroundTransparency={1}>
				<uigridlayout
					CellSize={new UDim2(1, 0, 0.075, 0)}
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Top}
				/>
				<LifeCounter lives={3} />
				<CashLabel value={100} />
			</frame>
		</Panel>
	);
}
