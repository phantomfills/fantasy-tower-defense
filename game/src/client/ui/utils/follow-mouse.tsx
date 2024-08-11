import React from "@rbxts/react";
import { useMouse } from "@rbxts/pretty-react-hooks";
import { Group } from "./group";

interface FollowMouseProps extends React.PropsWithChildren {
	size: UDim2;
	zIndex?: number;
}

export function FollowMouse({ size, children, zIndex }: FollowMouseProps) {
	const mouse = useMouse();

	return (
		<Group size={size} position={mouse.map((position) => UDim2.fromOffset(position.X, position.Y))} zIndex={zIndex}>
			{children}
		</Group>
	);
}
