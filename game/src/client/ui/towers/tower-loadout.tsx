import Roact from "@rbxts/roact";
import { TowerSlot } from "./tower-slot";

interface TowerLoadoutProps extends Roact.PropsWithChildren {
	children?: Roact.Children;
}

export function TowerLoadout({ children }: TowerLoadoutProps) {
	return (
		<frame Position={new UDim2(0, 0, 0.8, -5)} BackgroundTransparency={1} Size={new UDim2(1, 0, 0.2, 0)}>
			<uigridlayout
				CellSize={new UDim2(0.075, 0, 1, 0)}
				CellPadding={new UDim2(0.025, 0, 0, 0)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			{children}
		</frame>
	);
}
