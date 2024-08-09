import React from "@rbxts/react";

interface LabelProps extends React.PropsWithChildren {
	text?: string;
	backgroundColor?: Color3;
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
	layoutOrder?: number;
	autoSize?: "X" | "Y" | "XY";
}

export function Label({
	text,
	children,
	backgroundColor,
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
	layoutOrder,
	autoSize,
}: LabelProps) {
	return (
		<textlabel
			Text={text}
			FontFace={font}
			BackgroundColor3={backgroundColor}
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
			LayoutOrder={layoutOrder}
			AutomaticSize={autoSize}
			BorderSizePixel={0}
		>
			{children}
		</textlabel>
	);
}
