import Roact from "@rbxts/roact";
import { images } from "shared/assets";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";

export interface CashLabelProps {
	value: number;
	size?: UDim2;
	position?: UDim2;
	zIndex?: number;
}

export function CashLabel(props: CashLabelProps) {
	const { value, size, position, zIndex } = props;

	return (
		<frame Size={size} Position={position} BackgroundTransparency={1} ZIndex={zIndex}>
			<imagelabel
				Image={images.cash}
				Size={new UDim2(0.45, 0, 1, 0)}
				BackgroundTransparency={1}
				ZIndex={zIndex}
			/>
			<textlabel
				Size={new UDim2(0.55, 0, 0.8, 0)}
				Position={new UDim2(0.45, 0, 0.1, 0)}
				BackgroundTransparency={1}
				TextColor3={Theme.Green}
				TextScaled={true}
				TextXAlignment={Enum.TextXAlignment.Right}
				FontFace={fonts.inter.regular}
				Text={tostring(value)}
				ZIndex={zIndex}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</textlabel>
		</frame>
	);
}
