import Roact from "@rbxts/roact";
import { Panel } from "./panel";
import { TowerLoadout } from "./tower-loadout";
import { LifeCounter } from "./life-counter";
import { CashLabel } from "./cash-label";
import { FollowMouse } from "./follow-mouse";
import { TowerPlacementMessage } from "./tower-placement-message";
import { useSelector } from "@rbxts/react-reflex";
import { RootProducer, getPossibleTowerPlacement, getTowers } from "client/producers/root-provider";

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
