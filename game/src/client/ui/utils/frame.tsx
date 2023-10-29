import Roact from "@rbxts/roact";

interface FrameProps extends Roact.PropsWithChildren {
	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2;
	children?: Roact.Children;
	backgroundTransparency?: number;
	backgroundColor?: Color3 | Roact.Binding<Color3>;
	rotation?: number | Roact.Binding<number>;
	zIndex?: number;
}

export function Frame({
	size,
	position,
	children,
	anchorPoint,
	backgroundTransparency,
	backgroundColor,
	rotation,
	zIndex,
}: FrameProps) {
	return (
		<frame
			Size={size}
			Position={position}
			BackgroundTransparency={backgroundTransparency !== undefined ? backgroundTransparency : 1}
			BackgroundColor3={backgroundColor}
			AnchorPoint={anchorPoint}
			BorderSizePixel={0}
			Rotation={rotation}
			ZIndex={zIndex}
		>
			{children}
		</frame>
	);
}
