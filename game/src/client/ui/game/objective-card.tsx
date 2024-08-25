import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { fonts } from "../constants/fonts";
import { Group } from "../utils/group";
import { style } from "client/constants/style";

interface ProgressBarProps {
	progress: number;
	maxProgress: number;
}

function ProgressBar({ progress, maxProgress }: ProgressBarProps) {
	return (
		<>
			<Frame
				size={new UDim2(progress / maxProgress, 0, 1, 0)}
				backgroundColor={style.green}
				backgroundTransparency={0}
			>
				<uicorner CornerRadius={new UDim(0, 3)} />
			</Frame>

			<OneThickWhiteStroke />

			<uicorner CornerRadius={new UDim(0, 3)} />
		</>
	);
}

type ObjectiveCardProps =
	| {
			_type: "ONE_TIME";
			text: string;
			completed: boolean;
	  }
	| {
			_type: "PROGRESSIVE";
			text: string;
			progress: number;
			maxProgress: number;
	  };

export function ObjectiveCard(props: ObjectiveCardProps) {
	const { _type, text } = props;

	return (
		<Group size={UDim2.fromScale(1, 0.15)}>
			<uipadding PaddingLeft={new UDim(0, 5)} />

			<Label
				text={`• ${text} ${_type === "PROGRESSIVE" ? `(${props.progress}/${props.maxProgress})` : ""}`}
				size={new UDim2(1, 0, 0.65, 0)}
				font={fonts.inter.regular}
				textAlignmentX={Enum.TextXAlignment.Center}
				textColor={style.white}
			/>

			{_type === "ONE_TIME" && (
				<Group size={new UDim2(0.5, 0, 0.35, 0)} position={UDim2.fromScale(0.25, 0.65)}>
					<ProgressBar progress={props.completed ? 1 : 0} maxProgress={1} />
				</Group>
			)}

			{_type === "PROGRESSIVE" && (
				<Group size={new UDim2(0.5, 0, 0.35, 0)} position={UDim2.fromScale(0.25, 0.65)}>
					<ProgressBar progress={props.progress} maxProgress={props.maxProgress} />
				</Group>
			)}
		</Group>
	);
}
