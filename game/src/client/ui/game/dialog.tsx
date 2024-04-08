import React, { useEffect } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { lerpBinding, Spring, useMotor } from "@rbxts/pretty-react-hooks";
import { images } from "shared/assets";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Debris } from "@rbxts/services";
import { useSelector } from "@rbxts/react-reflex";
import {
	selectDialogComplete,
	selectDialogText,
	selectNumberOfPlayersWhoCompletedDialog,
	selectTotalNumberOfPlayersWhoMustCompleteDialog,
} from "shared/store/dialog";
import { Events } from "client/network";

interface TickProps {
	size: UDim2;
	position: UDim2;
	onClick: () => void;
}

function Tick({ size, position, onClick }: TickProps) {
	return (
		<imagebutton
			Image={images.tick}
			Size={size}
			Position={position}
			Event={{
				MouseButton1Click: () => {
					const tickSound = createSound(sounds.dialog_tick, { volume: 0.2 });
					tickSound.Play();

					Debris.AddItem(tickSound, 2);

					onClick();
				},
			}}
			BackgroundTransparency={1}
		/>
	);
}

export function Dialog() {
	const possibleText = useSelector(selectDialogText);
	const dialogComplete = useSelector(selectDialogComplete);
	const numberTicked = useSelector(selectNumberOfPlayersWhoCompletedDialog);
	const totalTicksRequired = useSelector(selectTotalNumberOfPlayersWhoMustCompleteDialog);

	const rem = useRem();
	const [dialogAppearTransition, setDialogAppearTransition] = useMotor(0);

	useEffect(() => {
		if (dialogComplete) {
			setDialogAppearTransition(new Spring(0, { dampingRatio: 0.6, frequency: 3 }));
			return;
		}

		const dialogSound = createSound(sounds.dialog_appear, { volume: 0.2 });
		dialogSound.Play();

		Debris.AddItem(dialogSound, 2);

		setDialogAppearTransition(new Spring(1, { dampingRatio: 0.6, frequency: 3 }));
	}, [dialogComplete]);

	if (!possibleText.exists) return <></>;

	const text = possibleText.value;

	return (
		<Frame
			size={new UDim2(0.35, 0, 0.18, 0)}
			position={lerpBinding(dialogAppearTransition, new UDim2(0.5, 0, 1.2, 0), new UDim2(0.5, 0, 0.7, 0))}
			backgroundTransparency={0.5}
			backgroundColor={Color3.fromRGB(0, 0, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<OneThickWhiteStroke />
			<uicorner CornerRadius={new UDim(0, 3)} />
			<Label
				text={text}
				size={new UDim2(1, -20, 1, -20)}
				position={new UDim2(0, 10, 0, 10)}
				textAlignmentX={Enum.TextXAlignment.Left}
				textAlignmentY={Enum.TextYAlignment.Top}
				textSize={rem(2)}
				font={fonts.inter.regular}
				textColor={Color3.fromRGB(255, 255, 255)}
				textWrapped={true}
			/>
			<Label
				size={new UDim2(1, -30, 0, 20)}
				position={new UDim2(0, -5, 1, -30)}
				font={fonts.inter.bold}
				text={`(${numberTicked}/${totalTicksRequired})`}
				textSize={rem(2)}
				textAlignmentX={Enum.TextXAlignment.Right}
				textColor={Color3.fromRGB(255, 255, 255)}
			/>
			<Tick
				size={new UDim2(0, 20, 0, 20)}
				position={new UDim2(1, -30, 1, -30)}
				onClick={() => Events.completeDialog.fire()}
			/>
		</Frame>
	);
}
