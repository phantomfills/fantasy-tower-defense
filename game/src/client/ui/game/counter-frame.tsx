import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { style } from "client/constants/style";

interface CounterFrameProps extends React.PropsWithChildren {}

export function CounterFrame({ children }: CounterFrameProps) {
	return (
		<Frame
			size={new UDim2(1, 0, 1, 0)}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
			backgroundColor={style.black}
			backgroundTransparency={0.5}
		>
			<OneThickWhiteStroke />
			{children}
		</Frame>
	);
}
