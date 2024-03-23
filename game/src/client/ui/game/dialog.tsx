import Roact, { useEffect } from "@rbxts/roact";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useTypewriter } from "../hooks/use-typewriter";
import { lerpBinding, Spring, useMotor } from "@rbxts/pretty-react-hooks";

export interface DialogProps {
	text: string;
	visible: boolean;
}

export function Dialog({ text, visible }: DialogProps) {
	const rem = useRem();
	const typewriter = useTypewriter(text, 20);

	const [dialogAppearTransition, setDialogAppearTransition] = useMotor(0);

	useEffect(() => {
		if (!visible) {
			setDialogAppearTransition(new Spring(0, { dampingRatio: 0.6, frequency: 3 }));
			return;
		}

		setDialogAppearTransition(new Spring(1, { dampingRatio: 0.6, frequency: 3 }));
	}, [visible]);

	return (
		<Frame
			size={new UDim2(0.35, 0, 0.18, 0)}
			position={lerpBinding(dialogAppearTransition, new UDim2(0.5, 0, 1.2, 0), new UDim2(0.5, 0, 0.7, 0))}
			backgroundTransparency={0.5}
			backgroundColor={Color3.fromRGB(0, 0, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<OneThickWhiteStroke />
			<uicorner CornerRadius={new UDim(0, 8)} />
			<Label
				text={typewriter}
				size={new UDim2(1, -20, 1, -20)}
				position={new UDim2(0, 10, 0, 10)}
				textAlignmentX={Enum.TextXAlignment.Left}
				textAlignmentY={Enum.TextYAlignment.Top}
				textSize={rem(2)}
				font={fonts.inter.regular}
				textColor={Color3.fromRGB(255, 255, 255)}
				textWrapped={true}
			/>
		</Frame>
	);
}
