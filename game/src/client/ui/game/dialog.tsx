import React, { useEffect, useState } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useSelector } from "@rbxts/react-reflex";
import { selectDialogs } from "shared/store/dialog";
import { Dialog } from "shared/store/level";
import { setTimeout } from "@rbxts/set-timeout";
import { holdFor, holdForPromise } from "shared/modules/utils/wait-util";

// export function Dialog() {
// 	const text = useSelector(selectDialogText);

// 	const rem = useRem();
// 	const [dialogAppearTransition, setDialogAppearTransition] = useMotor(0);

// 	useEffect(() => {
// 		if (text === undefined) {
// 			setDialogAppearTransition(new Spring(0, { dampingRatio: 0.6, frequency: 3 }));
// 			return;
// 		}

// 		const dialogSound = createSound(sounds.dialog_appear, { volume: 0.2 });
// 		dialogSound.Play();

// 		Debris.AddItem(dialogSound, 2);

// 		setDialogAppearTransition(new Spring(1, { dampingRatio: 0.6, frequency: 3 }));
// 	}, [text]);

// 	if (text === undefined) return <></>;

// 	return (
// 		<Frame
// 			size={new UDim2(0.28, 0, 0.14, 0)}
// 			position={lerpBinding(dialogAppearTransition, new UDim2(0.5, 0, 1.2, 0), new UDim2(0.5, 0, 0.75, 0))}
// 			backgroundTransparency={0.5}
// 			backgroundColor={Color3.fromRGB(0, 0, 0)}
// 			anchorPoint={new Vector2(0.5, 0.5)}
// 		>
// 			<OneThickWhiteStroke />
// 			<uicorner CornerRadius={new UDim(0, 3)} />
// 			<Label
// 				text={text}
// 				size={new UDim2(1, -20, 1, -20)}
// 				position={new UDim2(0, 10, 0, 10)}
// 				textAlignmentX={Enum.TextXAlignment.Left}
// 				textAlignmentY={Enum.TextYAlignment.Top}
// 				textSize={rem(1.5)}
// 				font={fonts.inter.regular}
// 				textColor={Color3.fromRGB(255, 255, 255)}
// 				textWrapped={true}
// 			/>
// 		</Frame>
// 	);
// }

interface DialogFrameProps {
	dialogTextProps: DialogTextProps;
}

export function DialogFrame({ dialogTextProps }: DialogFrameProps) {
	return (
		<Frame
			size={new UDim2(0.3, 0, 0.25, 0)}
			position={new UDim2(0.5, 0, 0.625, 0)}
			backgroundTransparency={0}
			backgroundColor={Color3.fromRGB(0, 163, 255)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<OneThickWhiteStroke />
			<uicorner CornerRadius={new UDim(0, 3)} />
			<Frame
				size={new UDim2(1, -50, 1, -50)}
				position={new UDim2(0.5, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
				backgroundTransparency={0}
				backgroundColor={Color3.fromRGB(32, 32, 32)}
			>
				<uipadding
					PaddingTop={new UDim(0, 10)}
					PaddingBottom={new UDim(0, 10)}
					PaddingLeft={new UDim(0, 10)}
					PaddingRight={new UDim(0, 10)}
				/>
				<uicorner CornerRadius={new UDim(0, 3)} />
				<OneThickWhiteStroke />
				<DialogText {...dialogTextProps} />
			</Frame>
		</Frame>
	);
}

export function Dialog() {
	const [dialogText, setDialogText] = useState<string | undefined>(undefined);
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const dialogs = useSelector(selectDialogs);

	useEffect(() => {
		// setDialogText(dialog?.text);
		// setDialogVisible(dialog !== undefined);

		// if (!dialog) return;
		// if (dialog.dialogType !== "AUTO_DISAPPEAR") return;

		// const cancelTimeout = setTimeout(() => {
		// 	setDialogVisible(false);
		// }, dialog.disappearTimestamp / 1000);

		let cancelTimeout = () => {};

		for (let index = 0; index < dialogs.size(); index++) {
			const dialog = dialogs[index];

			print(dialog);

			cancelTimeout();

			setDialogText(dialog.text);
			setDialogVisible(true);

			print("Dialog visible:", dialogVisible);

			print("Dialog text:", dialog.text);
			print("Dialog type:", dialog.dialogType);

			if (dialog.dialogType !== "AUTO_DISAPPEAR") {
				throw "Dialog type not supported.";
			}

			const nextDialogPromise = holdForPromise(dialog.disappearTimestamp).then(() => {
				if (index >= dialogs.size() - 1) {
					print("finish");
					setDialogVisible(false);
					return;
				}
			});

			cancelTimeout = () => {
				nextDialogPromise.cancel();
			};

			nextDialogPromise.await();
		}

		return () => {
			cancelTimeout();
		};
	}, [dialogs]);

	return dialogVisible ? <DialogFrame dialogTextProps={{ text: dialogText }} /> : <></>;
}

interface DialogTextProps {
	text: string | undefined;
}

export function DialogText({ text }: DialogTextProps) {
	const rem = useRem();

	return (
		<Label
			size={new UDim2(1, 0, 1, 0)}
			text={text}
			font={fonts.inter.regular}
			textSize={rem(2)}
			textColor={Color3.fromRGB(255, 255, 255)}
			textAlignmentX={Enum.TextXAlignment.Left}
			textAlignmentY={Enum.TextYAlignment.Top}
			textWrapped={true}
		/>
	);
}
