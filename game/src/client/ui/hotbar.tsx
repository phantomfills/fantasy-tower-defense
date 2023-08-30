import Roact from "@rbxts/roact";
import { HotbarSlots } from "./hotbar-slots";
import { CashLabel } from "./cash-label";

interface HotbarProps {
	slots: number;
}

export const Hotbar = (props: HotbarProps) => {
	return (
		<screengui ResetOnSpawn={false}>
			<frame
				key="hotbar-frame"
				Position={new UDim2(0, 0, 0.82, 0)}
				Size={new UDim2(1, 0, 0.14, 0)}
				BackgroundTransparency={1}
			>
				<uilistlayout
					key="hotbar-layout"
					Padding={new UDim(0, 5)}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					FillDirection={Enum.FillDirection.Horizontal}
				/>
				<frame key={1} BackgroundTransparency={1} Size={new UDim2(0.5, 0, 1, 0)}>
					<uigridlayout
						key="tower-loadout-layout"
						CellSize={new UDim2(0.18, 0, 0.9, 0)}
						CellPadding={new UDim2(0, -1, 0, 0)}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
					/>
					<HotbarSlots slots={props.slots} />
				</frame>
				<CashLabel
					key={2}
					value={1000}
					size={new UDim2(0.15, 0, 0.6, 0)}
					textXAlignment={Enum.TextXAlignment.Left}
				/>
			</frame>
		</screengui>
	);
};
