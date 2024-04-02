import React from "@rbxts/react";
import { BeatingHeart } from "./beating-heart";
import { fonts } from "../constants/fonts";
import { Label } from "../utils/label";
import { CounterFrame } from "./counter-frame";
import { useRem } from "../hooks/use-rem";

interface LifeCounterProps {
	lives: number;
}

export function LifeCounter({ lives }: LifeCounterProps) {
	const rem = useRem();

	return (
		<CounterFrame>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<BeatingHeart
				size={new UDim2(0.45, 0, 1, 0)}
				beatSize={new UDim2(0.55, 0, 1.22, 0)}
				position={new UDim2(0.2, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<Label
				size={new UDim2(0.55, 0, 0.8, 0)}
				position={new UDim2(0.45, 0, 0.1, 0)}
				textColor={Color3.fromRGB(255, 255, 255)}
				font={fonts.inter.bold}
				textAlignmentX={Enum.TextXAlignment.Center}
				text={`${lives}`}
				textSize={rem(3)}
			/>
		</CounterFrame>
	);
}
