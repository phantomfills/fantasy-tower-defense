import React, { forwardRef, Ref } from "@rbxts/react";

interface LabelProps<T extends Instance = TextLabel> extends React.PropsWithChildren {
	ref?: React.Ref<T>;
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
	richText?: boolean;
	autoSize?: "X" | "Y" | "XY";
}

export const Label = forwardRef(
	(
		{
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
			richText,
			autoSize,
		}: LabelProps,
		ref: Ref<TextLabel>,
	) => {
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
				RichText={richText}
				BorderSizePixel={0}
			>
				{children}
			</textlabel>
		);
	},
);
