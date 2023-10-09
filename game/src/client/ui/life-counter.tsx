import Roact from "@rbxts/roact";
import { BeatingHeart } from "./beating-heart";

interface LifeCounterProps {
	lives: number;
}

export const LifeCounter = ({ lives }: LifeCounterProps) => {
	return (
		<frame
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<BeatingHeart
				size={new UDim2(0.45, 0, 1, 0)}
				beatSize={new UDim2(0.5, 0, 1, 0)}
				position={new UDim2(0.25, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<textlabel
				Size={new UDim2(0.55, 0, 0.8, 0)}
				Position={new UDim2(0.45, 0, 0.1, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				Font={Enum.Font.GothamBold}
				TextXAlignment={Enum.TextXAlignment.Center}
				Text={tostring(lives)}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</textlabel>
		</frame>
	);
};
