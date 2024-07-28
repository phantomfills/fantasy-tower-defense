import React, { useEffect, useState } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useSelector } from "@rbxts/react-reflex";
import { selectDialogs } from "shared/store/dialog";
import { Dialog } from "shared/store/level";
import { setInterval } from "@rbxts/set-timeout";
import { holdForPromise } from "shared/modules/utils/wait-util";
import Object from "@rbxts/object-utils";

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
				size={new UDim2(1, -25, 1, -25)}
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
				<Frame
					size={new UDim2(0, 30, 0, 30)}
					position={new UDim2(1, -15, 1, -15)}
					backgroundTransparency={0}
					backgroundColor={Color3.fromRGB(0, 217, 255)}
				>
					<uicorner CornerRadius={new UDim(0.5, 0)} />
					<uistroke Color={Color3.fromRGB(255, 255, 255)} Thickness={3} />
					<Label
						size={new UDim2(0.75, 0, 0.75, 0)}
						position={new UDim2(0.125, 0, 0.125, 0)}
						text={tostring(dialogTextProps.countdownTime)}
						font={fonts.inter.bold}
						textColor={Color3.fromRGB(255, 255, 255)}
					/>
				</Frame>
				<OneThickWhiteStroke />
				<DialogText {...dialogTextProps} />
			</Frame>
		</Frame>
	);
}

export function Dialog() {
	const [dialogText, setDialogText] = useState<string | undefined>(undefined);
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [dialogCountdown, setDialogCountdown] = useState<number>(0);
	const dialogs = useSelector(selectDialogs, Object.deepEquals);

	useEffect(() => {
		let cancelTimeout = () => {};

		(async () => {
			for (let dialogIndex = 0; dialogIndex < dialogs.size(); dialogIndex++) {
				const dialog = dialogs[dialogIndex];

				cancelTimeout();

				setDialogVisible(true);
				setDialogText(dialog.text);

				if (dialog.dialogType !== "AUTO_DISAPPEAR") {
					throw "Dialog type not supported.";
				}

				let currentDialogCountdown = math.floor(dialog.disappearTimestamp / 1000);
				setDialogCountdown(currentDialogCountdown);

				const disconnect = setInterval(() => {
					currentDialogCountdown -= 1;

					print(currentDialogCountdown);
					setDialogCountdown(currentDialogCountdown);

					if (currentDialogCountdown <= 1) {
						disconnect();
					}
				}, 1);

				const nextDialogPromise = holdForPromise(dialog.disappearTimestamp).then(() => {
					if (dialogIndex >= dialogs.size() - 1) {
						setDialogVisible(false);
						return;
					}
				});

				cancelTimeout = () => {
					nextDialogPromise.cancel();
					disconnect();
				};

				nextDialogPromise.await();
			}
		})();

		return () => {
			cancelTimeout();
		};
	}, [dialogs]);

	return dialogVisible ? (
		<DialogFrame dialogTextProps={{ text: dialogText, countdownTime: dialogCountdown }} />
	) : (
		<></>
	);
}

interface DialogTextProps {
	text: string | undefined;
	countdownTime: number | undefined;
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
