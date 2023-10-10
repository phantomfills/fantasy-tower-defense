import Roact from "@rbxts/roact";
import { images } from "shared/assets";

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
				TextColor3={Color3.fromRGB(0, 255, 148)}
				TextScaled={true}
				TextXAlignment={Enum.TextXAlignment.Center}
				Font={Enum.Font.GothamBold}
				Text={tostring(value)}
				ZIndex={zIndex}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={2} />
			</textlabel>
		</frame>
	);
}
