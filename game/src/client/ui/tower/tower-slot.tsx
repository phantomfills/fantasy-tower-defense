import React, { useEffect, useState } from "@rbxts/react";
import { Spring, lerpBinding, useKeyPress, useMotor } from "@rbxts/pretty-react-hooks";
import { CashLabel } from "../game/cash-label";
import { numberToKeyCodeMap } from "shared/modules/utils/number-to-key-map";
import { fonts } from "../constants/fonts";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useRem } from "../hooks/use-rem";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Debris } from "@rbxts/services";

export interface TowerSlotProps {
	number: number;
	callback: () => void;
	icon: string;
	cost: number;
}

function runCallbackWithTowerSlotSound(callback: () => void) {
	const towerSlotSound = createSound(sounds.click, { volume: 0.2 });
	towerSlotSound.Play();

	Debris.AddItem(towerSlotSound, 2);

	callback();
}

export function TowerSlot({ number, callback, icon, cost }: TowerSlotProps) {
	const rem = useRem();

	const index = number - 1;

	const [hovering, setHovering] = useState(false);
	const [clicking, setClicking] = useState(false);
	const [buttonHoverTransition, setButtonHoverTransition] = useMotor(0);
	const [buttonSizeTransition, setButtonSizeTransition] = useMotor(0);
	const numberPressed = useKeyPress([numberToKeyCodeMap[index]]);

	useEffect(() => {
		if (!numberPressed) return;

		runCallbackWithTowerSlotSound(callback);
	}, [numberPressed]);

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
			<uilistlayout
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			<textbutton
				Size={lerpBinding(buttonSizeTransition, new UDim2(1, 0, 1, 0), new UDim2(0.8, 0, 0.8, 0))}
				BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
				BackgroundTransparency={0.2}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Text=""
				AutoButtonColor={false}
				Event={{
					MouseEnter: () => setHovering(true),
					MouseLeave: () => {
						setClicking(false);
						setHovering(false);
					},
					MouseButton1Down: () => {
						setClicking(true);
						runCallbackWithTowerSlotSound(callback);
					},
					MouseButton1Up: () => setClicking(false),
				}}
			>
				<uiaspectratioconstraint AspectRatio={1} DominantAxis={Enum.DominantAxis.Height} />
				<CashLabel
					value={cost}
					size={new UDim2(1, 0, 0.4, 0)}
					position={new UDim2(0, 0, 0.6, 0)}
					zIndex={4}
					textSize={rem(3)}
				/>
				<imagelabel
					Image={icon}
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ZIndex={3}
					Position={lerpBinding(buttonHoverTransition, new UDim2(0, 0, 0, 0), new UDim2(0, 0, -0.1, 0))}
				/>
				<uicorner CornerRadius={new UDim(0, 10)} />
				<OneThickWhiteStroke />
				<Frame
					size={new UDim2(0.4, 0, 0.4, 0)}
					backgroundTransparency={0}
					backgroundColor={lerpBinding(buttonHoverTransition, new Color3(0, 0.58, 1), new Color3(0, 0.75, 1))}
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
						textSize={rem(3)}
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
