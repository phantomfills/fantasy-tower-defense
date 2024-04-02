import React from "@rbxts/react";
import { Frame } from "../utils/frame";

interface MatchInfoProps extends React.PropsWithChildren {}

export function MatchInfo({ children }: MatchInfoProps) {
	return (
		<Frame size={new UDim2(0.1, 0, 1, -46)} position={new UDim2(0.9, -10, 0, 36)}>
			<uigridlayout
				CellSize={new UDim2(1, 0, 0.075, 0)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			{children}
		</Frame>
	);
}
