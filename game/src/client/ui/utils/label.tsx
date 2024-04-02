import React from "@rbxts/react";

interface LabelProps extends React.PropsWithChildren {
	text?: string;
	backgroundTransparency?: number;
	font: Font;
	size?: UDim2;
	position?: UDim2;
	textAlignmentX?: Enum.TextXAlignment;
	textAlignmentY?: Enum.TextYAlignment;
	textColor?: Color3;
	zIndex?: number;
	textSize?: number;
	textWrapped?: boolean;
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
	textSize,
	textWrapped,
}: LabelProps) {
	return (
		<textlabel
			Text={text}
			FontFace={font}
			BackgroundTransparency={backgroundTransparency !== undefined ? backgroundTransparency : 1}
			Size={size}
			Position={position}
			TextScaled={textSize === undefined}
			TextColor3={textColor}
			ZIndex={zIndex}
			TextXAlignment={textAlignmentX}
			TextYAlignment={textAlignmentY}
			TextSize={textSize}
			TextWrapped={textWrapped}
		>
			{children}
		</textlabel>
	);
}
