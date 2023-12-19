import Roact from "@rbxts/roact";
import { BeatingHeart } from "./beating-heart";
import { fonts } from "../constants/fonts";
import { Label } from "../utils/label";
import { CounterFrame } from "./counter-frame";

interface LifeCounterProps {
	lives: number;
}

export function LifeCounter({ lives }: LifeCounterProps) {
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
			/>
		</CounterFrame>
	);
}
