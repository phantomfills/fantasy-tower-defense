import Roact from "@rbxts/roact";
import { images } from "shared/assets";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";

export interface CashLabelProps {
	value: number;
	size?: UDim2;
	position?: UDim2;
	zIndex?: number;
}

export function CashLabel(props: CashLabelProps) {
	const { value, size, position, zIndex } = props;

	return (
		<Frame size={size} position={position}>
			<imagelabel
				Image={images.cash}
				Size={new UDim2(0.45, 0, 1, 0)}
				BackgroundTransparency={1}
				ZIndex={zIndex}
			/>
			<Label
				size={new UDim2(0.55, 0, 0.8, 0)}
				position={new UDim2(0.45, 0, 0.1, 0)}
				textColor={Theme.Green}
				textAlignmentX={Enum.TextXAlignment.Right}
				font={fonts.inter.regular}
				text={tostring(value)}
				zIndex={zIndex}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</Label>
		</Frame>
	);
}
