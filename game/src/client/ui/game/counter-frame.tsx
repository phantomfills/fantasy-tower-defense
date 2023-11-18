import Roact from "@rbxts/roact";
import { Frame } from "../utils/frame";

interface CounterFrameProps extends Roact.PropsWithChildren {
	children?: Roact.Children;
}

export function CounterFrame({ children }: CounterFrameProps) {
	return (
		<Frame
			size={new UDim2(1, 0, 1, 0)}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
			backgroundColor={new Color3(0, 0, 0)}
			backgroundTransparency={0.5}
		>
			{children}
		</Frame>
	);
}