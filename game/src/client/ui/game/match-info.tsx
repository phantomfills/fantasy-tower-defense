import Roact from "@rbxts/roact";

interface MatchInfoProps {
	children?: Roact.Children;
}

export function MatchInfo({ children }: MatchInfoProps) {
	return (
		<frame Size={new UDim2(0.1, 0, 1, -46)} Position={new UDim2(0.9, -10, 0, 36)} BackgroundTransparency={1}>
			<uigridlayout
				CellSize={new UDim2(1, 0, 0.075, 0)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			{children}
		</frame>
	);
}
