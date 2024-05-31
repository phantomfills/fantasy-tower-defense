import React from "@rbxts/react";
import { BeatingHeart } from "./beating-heart";
import { fonts } from "../constants/fonts";
import { Label } from "../utils/label";
import { CounterFrame } from "./counter-frame";
import { useRem } from "../hooks/use-rem";
import { formatNumberWithCommas } from "client/modules/number/format-number-with-commas";

interface LifeCounterProps {
	lives: number;
}

export function LifeCounter({ lives }: LifeCounterProps) {
	const rem = useRem();

	return (
		<CounterFrame>
			<uicorner CornerRadius={new UDim(0, 3)} />
			<BeatingHeart
				size={new UDim2(0.35, 0, 1, 0)}
				beatSize={new UDim2(0.55, 0, 1.22, 0)}
				position={new UDim2(0.15, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<Label
				size={new UDim2(0.65, 0, 0.8, 0)}
				position={new UDim2(0.32, 0, 0.1, 0)}
				textColor={Color3.fromRGB(255, 255, 255)}
				font={fonts.inter.bold}
				textAlignmentX={Enum.TextXAlignment.Left}
				text={formatNumberWithCommas(lives)}
				textSize={rem(2)}
			/>
		</CounterFrame>
	);
}
