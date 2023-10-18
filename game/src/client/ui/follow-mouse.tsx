import Roact from "@rbxts/roact";

interface FollowMouseProps extends Roact.PropsWithChildren {
	size?: UDim2;
	children?: Roact.Children;
}

export function FollowMouse({ size, children }: FollowMouseProps) {
	return <>{children}</>;
}
