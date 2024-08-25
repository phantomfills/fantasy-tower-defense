import React, { useEffect } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { lerpBinding, Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { SPRING_PROPS } from "client/constants/spring-props";
import { style } from "client/constants/style";

export function Overlay() {
	const [showTransition, setShowTransition] = useMotor(0);

	useEffect(() => {
		setShowTransition(new Spring(1, SPRING_PROPS.responsive));
	}, []);

	return (
		<Frame
			size={new UDim2(1, 0, 1, 0)}
			backgroundColor={style.blue}
			backgroundTransparency={lerpBinding(showTransition, 1, 0.4)}
			zIndex={0}
		/>
	);
}
