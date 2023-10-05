import Roact from "@rbxts/roact";
import { images } from "shared/modules/images";
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
			{/* <imagelabel Image={images.heart} Size={new UDim2(0.5, 0, 1, 0)} BackgroundTransparency={1}>
				<uiaspectratioconstraint AspectRatio={1} DominantAxis={Enum.DominantAxis.Height} />
			</imagelabel> */}
			<BeatingHeart
				size={new UDim2(0.4, 0, 0.8, 0)}
				beatSize={new UDim2(0.5, 0, 1, 0)}
				position={new UDim2(0.25, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			/>
			<textlabel
				Size={new UDim2(0.5, 0, 1, 0)}
				Position={new UDim2(0.5, 0, 0, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				Font={Enum.Font.GothamBold}
				TextXAlignment={Enum.TextXAlignment.Left}
				Text={tostring(lives)}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={2} />
			</textlabel>
		</frame>
	);
};
