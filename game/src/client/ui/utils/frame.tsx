import Roact, { Binding } from "@rbxts/roact";

interface FrameProps extends Roact.PropsWithChildren {
	size?: UDim2 | Binding<UDim2>;
	position?: UDim2 | Binding<UDim2>;
	anchorPoint?: Vector2;
	children?: Roact.Children;
	backgroundTransparency?: number;
	backgroundColor?: Color3;
}

export function Frame({ size, position, children, anchorPoint, backgroundTransparency, backgroundColor }: FrameProps) {
	return (
		<frame
			Size={size}
			Position={position}
			BackgroundTransparency={backgroundTransparency !== undefined ? backgroundTransparency : 1}
			BackgroundColor3={backgroundColor}
			AnchorPoint={anchorPoint}
		>
			{children}
		</frame>
	);
}
