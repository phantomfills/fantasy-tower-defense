import Roact from "@rbxts/roact";
import { Panel } from "./panel";
import { TowerLoadout } from "./tower-loadout";
import { TowerSlotProps } from "./tower-slot";
import { LifeCounter } from "./life-counter";
import { CashLabel } from "./cash-label";

interface UserInterfaceProps {
	towers: TowerSlotProps[];
}

export function UserInterface({ towers }: UserInterfaceProps) {
	return (
		<Panel>
			<TowerLoadout towerSlots={towers} />
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
