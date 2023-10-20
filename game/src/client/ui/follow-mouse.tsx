import Roact, { useBinding, useEffect } from "@rbxts/roact";
import { RunService, UserInputService } from "@rbxts/services";

interface FollowMouseProps extends Roact.PropsWithChildren {
	size?: UDim2;
	children?: Roact.Children;
}

export function FollowMouse({ size, children }: FollowMouseProps) {
	const [position, updatePosition] = useBinding(new UDim2(0, 0, 0, 0));

	useEffect(() => {
		const updatePositionConnection = RunService.RenderStepped.Connect(() => {
			const mouseLocation = UserInputService.GetMouseLocation();
			updatePosition(new UDim2(0, mouseLocation.X, 0, mouseLocation.Y));
		});
		return () => updatePositionConnection.Disconnect();
	});

	return (
		<frame Size={size} Position={position} BackgroundTransparency={1}>
			{children}
		</frame>
	);
}
