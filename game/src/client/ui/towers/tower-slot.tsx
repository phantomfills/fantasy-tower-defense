import { Spring, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";
import Roact, { useEffect, useState } from "@rbxts/roact";
import { CashLabel } from "../game/cash-label";
import { numberToKeyCodeMap } from "shared/modules/util/number-to-key-map";
import { UserInputService } from "@rbxts/services";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";

export interface TowerSlotProps {
	number: number;
	callback: () => void;
	icon: string;
	cost: number;
}

export function TowerSlot({ number, callback, icon, cost }: TowerSlotProps) {
	const index = number - 1;

	const [hovering, setHovering] = useState(false);
	const [clicking, setClicking] = useState(false);
	const [buttonHoverTransition, setButtonHoverTransition] = useMotor(0);
	const [buttonSizeTransition, setButtonSizeTransition] = useMotor(0);

	useEffect(() => {
		if (!numberToKeyCodeMap[index]) return;
		const keyCode = numberToKeyCodeMap[index];

		const keyDownConnection = UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;
			if (input.KeyCode !== keyCode) return;

			setClicking(true);
			callback();
		});

		const keyUpConnection = UserInputService.InputEnded.Connect((input, processed) => {
			if (processed) return;
			if (input.KeyCode !== keyCode) return;

			setClicking(false);
		});

		return () => {
			keyDownConnection.Disconnect();
			keyUpConnection.Disconnect();
		};
	}, []);

	useEffect(() => {
		setButtonHoverTransition(
			new Spring(hovering ? 1 : 0, {
				dampingRatio: 0.6,
				frequency: 3,
			}),
		);
	}, [hovering]);

	useEffect(() => {
		setButtonSizeTransition(
			new Spring(clicking ? 1 : 0, {
				dampingRatio: 0.35,
				frequency: 3,
			}),
		);
	}, [clicking]);

	return (
		<Frame>
			<textbutton
				Size={lerpBinding(buttonSizeTransition, new UDim2(1, 0, 1, 0), new UDim2(0.8, 0, 0.8, 0))}
				BackgroundColor3={Theme.Base}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={lerpBinding(buttonHoverTransition, new UDim2(0.5, 0, 0.5, 0), new UDim2(0.5, 0, 0.4, 0))}
				Text=""
				AutoButtonColor={false}
				Event={{
					MouseEnter: () => {
						setHovering(true);
					},
					MouseLeave: () => {
						setClicking(false);
						setHovering(false);
					},
					MouseButton1Down: () => {
						setClicking(true);
						callback();
					},
					MouseButton1Up: () => {
						setClicking(false);
					},
				}}
			>
				<uiaspectratioconstraint AspectRatio={1} DominantAxis={Enum.DominantAxis.Height} />
				<CashLabel value={cost} size={new UDim2(1, 0, 0.4, 0)} position={new UDim2(0, 0, 0.6, 0)} zIndex={3} />
				<imagelabel
					Image={icon}
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ZIndex={1}
					Position={lerpBinding(buttonHoverTransition, new UDim2(0, 0, 0, 0), new UDim2(0, 0, -0.1, 0))}
				/>
				<uicorner CornerRadius={new UDim(0.1, 0)} />
				<uistroke
					Color={Color3.fromRGB(255, 255, 255)}
					Thickness={1}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				/>
				<Frame
					size={new UDim2(0.4, 0, 0.4, 0)}
					backgroundTransparency={0}
					backgroundColor={lerpBinding(buttonHoverTransition, Theme.Lavender, Theme.Blue)}
					position={new UDim2(-0.125, 0, -0.125, 0)}
					rotation={lerpBinding(buttonHoverTransition, -10, 10)}
				>
					<uistroke
						Color={Color3.fromRGB(255, 255, 255)}
						Thickness={lerpBinding(buttonHoverTransition, 2, 4)}
					/>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<Label
						text={tostring(number)}
						font={fonts.inter.bold}
						textColor={Color3.fromRGB(255, 255, 255)}
						textAlignmentX={Enum.TextXAlignment.Center}
						backgroundTransparency={1}
						size={new UDim2(1, 0, 1, 0)}
					/>
				</Frame>
			</textbutton>
		</Frame>
	);
}
