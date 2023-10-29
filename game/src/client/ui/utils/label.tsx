import Roact from "@rbxts/roact";

interface LabelProps extends Roact.PropsWithChildren {
	text?: string;
	children?: Roact.Children;
	backgroundTransparency?: number;
	font: Font;
	size?: UDim2;
	position?: UDim2;
	textAlignmentX?: Enum.TextXAlignment;
	textAlignmentY?: Enum.TextYAlignment;
	textColor?: Color3;
	zIndex?: number;
}

export function Label({
	text,
	children,
	backgroundTransparency,
	font,
	size,
	position,
	textColor,
	zIndex,
	textAlignmentX,
	textAlignmentY,
}: LabelProps) {
	return (
		<textlabel
			Text={text}
			FontFace={font}
			BackgroundTransparency={backgroundTransparency !== undefined ? backgroundTransparency : 1}
			Size={size}
			Position={position}
			TextScaled={true}
			TextColor3={textColor}
			ZIndex={zIndex}
			TextXAlignment={textAlignmentX}
			TextYAlignment={textAlignmentY}
		>
			{children}
		</textlabel>
	);
}
