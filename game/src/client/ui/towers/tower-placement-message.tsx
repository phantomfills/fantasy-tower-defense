import Roact from "@rbxts/roact";
import { TowerType } from "../../../shared/modules/tower/tower-type";
import { fonts } from "../constants/fonts";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { images } from "shared/assets";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";

interface TowerPlacementActionMessageProps {
	action: string;
	icon: string;
}

function TowerPlacementActionMessage({ action, icon }: TowerPlacementActionMessageProps) {
	return (
		<Frame backgroundTransparency={0.5} backgroundColor={Color3.fromRGB(25, 25, 25)} zIndex={4}>
			<OneThickWhiteStroke />
			<imagelabel
				Image={icon}
				Position={new UDim2(0, -13, 0, -13)}
				Size={new UDim2(0.25, 25, 1, 25)}
				BackgroundTransparency={1}
				ZIndex={4}
			>
				<uiaspectratioconstraint AspectRatio={1} DominantAxis={Enum.DominantAxis.Width} />
			</imagelabel>
			<Label
				size={new UDim2(0.75, -5, 0.75, 0)}
				position={new UDim2(0.25, 0, 0.125, 0)}
				font={fonts.inter.regular}
				textColor={Color3.fromRGB(255, 255, 255)}
				text={action}
				textAlignmentX={Enum.TextXAlignment.Right}
				zIndex={4}
			/>
			<uicorner CornerRadius={new UDim(0, 4)} />
		</Frame>
	);
}

export function TowerPlacementMessage() {
	return (
		<Frame position={new UDim2(0, 20, 0, 0)} size={new UDim2(1, 0, 1, 0)} backgroundTransparency={1}>
			<uigridlayout CellSize={new UDim2(1, 0, 1, 0)} CellPadding={new UDim2(0, 0, 0, 12)} />
			<TowerPlacementActionMessage action="Rotate" icon={images.r_button} />
			<TowerPlacementActionMessage action="Cancel" icon={images.q_button} />
			<TowerPlacementActionMessage action="Place" icon={images.left_mouse_button} />
		</Frame>
	);
}
