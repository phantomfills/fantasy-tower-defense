import { Spring, lerpBinding, useInterval, useMotor } from "@rbxts/pretty-react-hooks";
import Roact from "@rbxts/roact";
import { setTimeout } from "@rbxts/set-timeout";
import images = require("assets");

interface BeatingHeartProps {
	size: UDim2;
	beatSize: UDim2;
	position: UDim2;
	anchorPoint?: Vector2;
}

export const BeatingHeart = (props: BeatingHeartProps) => {
	const { size, beatSize, position, anchorPoint } = props;
	const [pulseTransition, setPulseTransition] = useMotor(0);

	const relax = () => {
		setPulseTransition(
			new Spring(0, {
				dampingRatio: 0.25,
				frequency: 8,
			}),
		);
	};

	const impulse = () => {
		setPulseTransition(
			new Spring(1, {
				dampingRatio: 0.05,
				frequency: 6,
			}),
		);

		setTimeout(relax, 0.05);
	};

	useInterval(impulse, 1);

	return (
		<imagelabel
			Image={images.heart}
			Size={lerpBinding(pulseTransition, size, beatSize)}
			Position={position}
			AnchorPoint={anchorPoint || new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			ImageColor3={Color3.fromRGB(255, 255, 255)}
		/>
	);
};
