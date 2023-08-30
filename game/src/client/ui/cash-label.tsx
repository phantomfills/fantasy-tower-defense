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
		<textlabel
			Position={position || undefined}
			Size={size || undefined}
			BackgroundTransparency={1}
			TextColor3={Color3.fromRGB(0, 255, 148)}
			TextScaled={true}
			Text={`$${tostring(value)}`}
			Font={Enum.Font.GothamBold}
			TextXAlignment={textXAlignment}
		>
			<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={3} />
		</textlabel>
	);
};
