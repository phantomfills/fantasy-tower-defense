import Roact, { useBinding, useEffect } from "@rbxts/roact";
import { RunService, UserInputService } from "@rbxts/services";
import { Frame } from "./frame";

interface FollowMouseProps extends Roact.PropsWithChildren {
	size: UDim2;
	children?: Roact.Children;
}

export function FollowMouse({ size, children }: FollowMouseProps) {
	const [position, updatePosition] = useBinding(new UDim2(0, 0, 0, 0));

	useEffect(() => {
		const updatePositionConnection = RunService.RenderStepped.Connect(() => {
			const mouseLocation = UserInputService.GetMouseLocation();
			updatePosition(new UDim2(0, mouseLocation.X, -size.Y.Scale, mouseLocation.Y));
		});

		return () => updatePositionConnection.Disconnect();
	}, []);

	return (
		<Frame size={size} position={position}>
			{children}
		</Frame>
	);
}
