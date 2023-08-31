import Roact from "@rbxts/roact";
import { HotbarSlots } from "./hotbar-slots";
import { CashLabel } from "./cash-label";
import { HotbarProps } from "./hotbar";

export const HotbarFrame = (props: HotbarProps) => {
	return (
		<frame
			key="hotbar-frame"
			Position={new UDim2(0, 0, 0.82, 0)}
			Size={new UDim2(1, 0, 0.14, 0)}
			BackgroundTransparency={1}
		>
			<uilistlayout
				key="hotbar-layout"
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				FillDirection={Enum.FillDirection.Horizontal}
			/>
			<frame key={1} BackgroundTransparency={1} Size={new UDim2(0.35, 0, 1, 0)}>
				<uigridlayout
					key="tower-loadout-layout"
					CellSize={new UDim2(0.18, 0, 0.9, 0)}
					VerticalAlignment={Enum.VerticalAlignment.Bottom}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
				/>
				<HotbarSlots slots={props.slots} slotChildren={[<uisizeconstraint MinSize={new Vector2(35, 35)} />]} />
			</frame>
			<CashLabel
				key={2}
				value={20000}
				size={new UDim2(0.1, 0, 0.3, 0)}
				textXAlignment={Enum.TextXAlignment.Left}
			/>
		</frame>
	);
};
