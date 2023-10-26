import { Spring, lerpBinding, useInterval, useMotor } from "@rbxts/pretty-react-hooks";
import Roact from "@rbxts/roact";
import { setTimeout } from "@rbxts/set-timeout";
import { images } from "shared/assets";

interface BeatingHeartProps {
	size: UDim2;
	beatSize: UDim2;
	position: UDim2;
	anchorPoint?: Vector2;
}

export function BeatingHeart(props: BeatingHeartProps) {
	const { size, beatSize, position, anchorPoint } = props;
	const [pulseTransition, setPulseTransition] = useMotor(0);

	function relax() {
		setPulseTransition(
			new Spring(0, {
				dampingRatio: 0.25,
				frequency: 3,
			}),
		);
	}

	function impulse() {
		setPulseTransition(
			new Spring(1, {
				dampingRatio: 1,
				frequency: 10.5,
			}),
		);

		setTimeout(relax, 0.05);
	}

	useInterval(impulse, 1);

	return (
		<frame
			BackgroundTransparency={1}
			Size={lerpBinding(pulseTransition, size, beatSize)}
			AnchorPoint={anchorPoint}
			Position={position}
		>
			<uiaspectratioconstraint DominantAxis={Enum.DominantAxis.Height} AspectRatio={1} />
			<imagelabel
				Image={images.heart}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ImageColor3={Color3.fromRGB(255, 255, 255)}
				ZIndex={1}
			/>
			<imagelabel
				Image={images.heart_glow}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ImageColor3={Color3.fromRGB(255, 255, 255)}
				ZIndex={0}
			/>
		</frame>
	);
}
