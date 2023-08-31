import Roact from "@rbxts/roact";

interface CashLabelProps {
	size?: UDim2;
	position?: UDim2;
	textXAlignment?: Enum.TextXAlignment;
	value: number;
}

export const CashLabel = (props: CashLabelProps) => {
	const { size, position, value, textXAlignment } = props;

	return (
		<frame Position={position} Size={size} BackgroundTransparency={1}>
			<imagelabel
				Size={new UDim2(0.3, 0, 1, 0)}
				BackgroundTransparency={1}
				Image={"rbxassetid://11317276252"}
				ZIndex={2}
			>
				<uiaspectratioconstraint DominantAxis={Enum.DominantAxis.Width} AspectRatio={1} />
			</imagelabel>
			<textlabel
				Size={new UDim2(0.7, 0, 1, 0)}
				Position={new UDim2(0.3, 0, 0, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(0, 255, 148)}
				TextScaled={true}
				Text={tostring(value)}
				Font={Enum.Font.GothamBold}
				TextXAlignment={textXAlignment}
				ZIndex={1}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={3} />
			</textlabel>
		</frame>
	);
};
