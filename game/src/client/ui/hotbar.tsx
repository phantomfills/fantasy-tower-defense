import Roact from "@rbxts/roact";
import { HotbarSlots } from "./hotbar-slots";

interface HotbarProps {
	slots: number;
}

export const Hotbar = (props: HotbarProps) => {
	return (
		<screengui ResetOnSpawn={false}>
			<frame
				key="hotbar-frame"
				Position={new UDim2(0, 0, 0.8, 0)}
				Size={new UDim2(1, 0, 0.2, 0)}
				BackgroundTransparency={1}
			>
				<uigridlayout
					CellSize={new UDim2(0.09, 0, 0.9, 0)}
					CellPadding={new UDim2(0, 10, 0, 0)}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
				/>
				<HotbarSlots slots={props.slots} />
			</frame>
		</screengui>
	);
};
