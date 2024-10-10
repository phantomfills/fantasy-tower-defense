import React, { useEffect, useState } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useSelector } from "@rbxts/react-reflex";
import { selectDialogs, selectOwnDialogIndex } from "shared/store/dialog";
import { Dialog } from "shared/store/level";
import { setInterval } from "@rbxts/set-timeout";
import { holdForPromise } from "shared/modules/utils/wait-util";
import Object from "@rbxts/object-utils";
import { selectDialogVisibilityType } from "client/store/settings";
import { style } from "client/constants/style";
import { Events } from "client/network";
import { Timer } from "./timer";
import { useTimer } from "@rbxts/pretty-react-hooks";

interface DialogFrameProps {
	time: number;
	alpha: number | React.Binding<number>;
	text: string | undefined;
}

export function DialogFrame({ text, time, alpha }: DialogFrameProps) {
	return (
		<Frame
			size={new UDim2(0.3, 0, 0.25, 0)}
			position={new UDim2(0.5, 0, 0.625, 0)}
			backgroundColor={style.light_blue}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<OneThickWhiteStroke />
			<uicorner CornerRadius={new UDim(0, 3)} />
			<Frame
				size={new UDim2(1, -25, 1, -25)}
				position={new UDim2(0.5, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
				backgroundColor={style.black}
			>
				<uipadding
					PaddingTop={new UDim(0, 10)}
					PaddingBottom={new UDim(0, 10)}
					PaddingLeft={new UDim(0, 10)}
					PaddingRight={new UDim(0, 10)}
				/>
				<uicorner CornerRadius={new UDim(0, 3)} />

				<Timer time={time} alpha={alpha} size={new UDim2(0, 30, 0, 30)} position={new UDim2(1, -15, 1, -15)} />
				<OneThickWhiteStroke />
				<DialogText text={text} />
			</Frame>
		</Frame>
	);
}

export function Dialog() {
	const dialogVisibilityType = useSelector(selectDialogVisibilityType);
	const [dialogText, setDialogText] = useState<string | undefined>(undefined);
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [dialogCountdown, setDialogCountdown] = useState<number>(0);
	const [dialogTotalTime, setDialogTotalTime] = useState<number>(0);
	const dialogs = useSelector(selectDialogs, Object.deepEquals);
	const currentDialogIndex = useSelector(selectOwnDialogIndex);
	const timer = useTimer();

	if (dialogVisibilityType === "NO") return <></>;

	useEffect(() => {
		let cancelTimeout = () => {};

		(async () => {
			for (let dialogIndex = currentDialogIndex; dialogIndex < dialogs.size(); dialogIndex++) {
				const dialog = dialogs[dialogIndex];

				Events.incrementDialogIndex.fire();

				cancelTimeout();

				setDialogVisible(true);
				setDialogText(dialog.text);

				if (dialog.dialogType !== "AUTO_DISAPPEAR") {
					throw "Dialog type not supported.";
				}

				let currentDialogCountdown = math.floor(dialog.disappearTimestamp / 1000);
				setDialogCountdown(currentDialogCountdown);
				setDialogTotalTime(dialog.disappearTimestamp / 1000);
				timer.reset();
				timer.start();

				const disconnect = setInterval(() => {
					currentDialogCountdown -= 1;

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

				let dismounted = false;

				cancelTimeout = () => {
					dismounted = true;
					nextDialogPromise.cancel();
					disconnect();
				};

				nextDialogPromise.await();

				if (dismounted) break;
			}
		})();

		return () => {
			cancelTimeout();
		};
	}, [dialogs]);

	return dialogVisible ? (
		<DialogFrame
			text={dialogText}
			time={dialogCountdown}
			alpha={timer.value.map((value) => 1 - (value * 1000) / (dialogTotalTime * 1000))}
		/>
	) : (
		<></>
	);
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
			textColor={style.white}
			textAlignmentX={Enum.TextXAlignment.Left}
			textAlignmentY={Enum.TextYAlignment.Top}
			textWrapped={true}
		/>
	);
}
