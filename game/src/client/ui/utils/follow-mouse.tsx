import React from "@rbxts/react";
import { Frame } from "./frame";
import { useMouse } from "@rbxts/pretty-react-hooks";

interface FollowMouseProps extends React.PropsWithChildren {
	size: UDim2;
	zIndex?: number;
}

export function FollowMouse({ size, children, zIndex }: FollowMouseProps) {
	const mouse = useMouse();

	return (
		<Frame size={size} position={mouse.map((position) => UDim2.fromOffset(position.X, position.Y))} zIndex={zIndex}>
			{children}
		</Frame>
	);
}
