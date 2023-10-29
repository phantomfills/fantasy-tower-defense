import Roact from "@rbxts/roact";
import { BeatingHeart } from "./beating-heart";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";

interface LifeCounterProps {
	lives: number;
}

export function LifeCounter({ lives }: LifeCounterProps) {
	return (
		<Frame size={new UDim2(1, 0, 1, 0)} position={new UDim2(0.5, 0, 0.5, 0)} anchorPoint={new Vector2(0.5, 0.5)}>
			<BeatingHeart
				size={new UDim2(0.45, 0, 1, 0)}
				beatSize={new UDim2(0.55, 0, 1.22, 0)}
				position={new UDim2(0.2, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<Label
				size={new UDim2(0.55, 0, 0.8, 0)}
				position={new UDim2(0.45, 0, 0.1, 0)}
				textColor={Theme.Text}
				font={fonts.inter.regular}
				textAlignmentX={Enum.TextXAlignment.Right}
				text={`${lives}`}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</Label>
		</Frame>
	);
}
