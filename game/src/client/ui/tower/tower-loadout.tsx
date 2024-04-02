import React from "@rbxts/react";
import { Frame } from "../utils/frame";

interface TowerLoadoutProps extends React.PropsWithChildren {}

export function TowerLoadout({ children }: TowerLoadoutProps) {
	return (
		<Frame position={new UDim2(0, 0, 0.8, -5)} size={new UDim2(1, 0, 0.2, 0)} zIndex={1}>
			<uigridlayout
				CellSize={new UDim2(0.075, 0, 1, 0)}
				CellPadding={new UDim2(0.025, 0, 0, 0)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			{children}
		</Frame>
	);
}
