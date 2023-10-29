import Roact from "@rbxts/roact";
import { BeatingHeart } from "./beating-heart";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";

interface LifeCounterProps {
	lives: number;
}

export function LifeCounter({ lives }: LifeCounterProps) {
	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<BeatingHeart
				size={new UDim2(0.45, 0, 1, 0)}
				beatSize={new UDim2(0.55, 0, 1.22, 0)}
				position={new UDim2(0.2, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<textlabel
				Size={new UDim2(0.55, 0, 0.8, 0)}
				Position={new UDim2(0.45, 0, 0.1, 0)}
				BackgroundTransparency={1}
				TextColor3={Theme.Text}
				TextScaled={true}
				FontFace={fonts.inter.regular}
				TextXAlignment={Enum.TextXAlignment.Right}
				Text={tostring(lives)}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</textlabel>
		</frame>
	);
}
