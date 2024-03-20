import Roact from "@rbxts/roact";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";

export interface DialogProps {
	text: string;
}

export function Dialog({ text }: DialogProps) {
	const rem = useRem();

	return (
		<Frame
			size={new UDim2(0.35, 0, 0.18, 0)}
			position={new UDim2(0.5, 0, 0.7, 0)}
			backgroundTransparency={0.5}
			backgroundColor={Color3.fromRGB(0, 0, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<OneThickWhiteStroke />
			<uicorner CornerRadius={new UDim(0, 8)} />
			<Label
				text={text}
				size={new UDim2(1, -20, 1, -20)}
				position={new UDim2(0, 10, 0, 10)}
				textAlignmentX={Enum.TextXAlignment.Left}
				textAlignmentY={Enum.TextYAlignment.Top}
				textSize={rem(2)}
				font={fonts.inter.regular}
				textColor={Color3.fromRGB(255, 255, 255)}
				textWrapped={true}
			/>
		</Frame>
	);
}
