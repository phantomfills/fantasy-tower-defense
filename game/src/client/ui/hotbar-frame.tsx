import Roact from "@rbxts/roact";
import { HotbarSlots } from "./hotbar-slots";
import { CashLabel } from "./cash-label";
import { HotbarProps } from "./hotbar";

export const HotbarFrame = (props: HotbarProps) => {
	const { towers } = props;

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
				Padding={new UDim(0, 10)}
			/>
			<frame key={1} BackgroundTransparency={1} Size={new UDim2(0.1 * towers.size(), 0, 1, 0)}>
				<uigridlayout
					key="tower-loadout-layout"
					CellSize={new UDim2(1 / towers.size() - 0.01, 0, 1, 0)}
					FillDirection={Enum.FillDirection.Horizontal}
					VerticalAlignment={Enum.VerticalAlignment.Bottom}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
				/>
				<HotbarSlots towers={towers} slotChildren={[<uisizeconstraint MinSize={new Vector2(35, 35)} />]} />
			</frame>
			<CashLabel
				key={2}
				value={3500}
				size={new UDim2(0.1, 0, 0.3, 0)}
				textXAlignment={Enum.TextXAlignment.Left}
			/>
		</frame>
	);
};
