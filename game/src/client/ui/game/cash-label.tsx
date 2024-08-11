import React from "@rbxts/react";
import { images } from "shared/assets";
import { fonts } from "../constants/fonts";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { formatNumberWithCommas } from "client/modules/number/format-number-with-commas";
import { Group } from "../utils/group";
import { style } from "client/constants/style";

export interface CashLabelProps {
	value: number;
	size?: UDim2;
	position?: UDim2;
	zIndex?: number;
	textSize?: number;
}

export function CashLabel({ value, size, position, zIndex, textSize }: CashLabelProps) {
	return (
		<Group size={size} position={position}>
			<imagelabel
				Image={images.cash}
				Size={new UDim2(0.35, 0, 1, 0)}
				Position={new UDim2(0.05, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				ZIndex={zIndex}
			>
				<uiaspectratioconstraint DominantAxis={Enum.DominantAxis.Height} />
			</imagelabel>
			<Label
				size={new UDim2(0.55, 0, 0.8, 0)}
				position={new UDim2(0.45, 0, 0.1, 0)}
				textColor={style.text}
				textAlignmentX={Enum.TextXAlignment.Left}
				font={fonts.inter.bold}
				text={formatNumberWithCommas(value)}
				textSize={textSize}
				zIndex={zIndex}
			/>
		</Group>
	);
}
