import Roact from "@rbxts/roact";
import { TowerSlot, TowerSlotProps } from "./tower-slot";

interface TowerLoadoutProps {
	towerSlots: TowerSlotProps[];
}

export const TowerLoadout = (props: TowerLoadoutProps) => {
	return (
		<frame Position={new UDim2(0, 0, 0.8, -5)} BackgroundTransparency={1} Size={new UDim2(1, 0, 0.2, 0)}>
			<uigridlayout
				CellSize={new UDim2(0.075, 0, 1, 0)}
				CellPadding={new UDim2(0.025, 0, 0, 0)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			{props.towerSlots.map((slot) => {
				return (
					<frame Position={new UDim2(0, 0, 0, 0)} BackgroundTransparency={1}>
						<uiaspectratioconstraint AspectRatio={1} />
						<TowerSlot {...slot} />
					</frame>
				);
			})}
		</frame>
	);
};
