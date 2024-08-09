import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { fonts } from "../constants/fonts";

type ObjectiveCardProps =
	| {
			_type: "ONE_TIME";
			text: string;
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
		<Frame backgroundColor={Color3.fromRGB(0, 0, 0)} backgroundTransparency={0.85} size={new UDim2(1, 0, 0.08, 0)}>
			<uipadding PaddingLeft={new UDim(0, 5)} />
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Left}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 5)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			<Label
				text={text}
				size={new UDim2(0, 0, 1, 0)}
				autoSize="X"
				font={fonts.inter.regular}
				textAlignmentX={Enum.TextXAlignment.Left}
				textColor={Color3.fromRGB(255, 255, 255)}
			/>

			{_type === "PROGRESSIVE" && (
				<Frame
					size={new UDim2(0.5, 0, 0.5, 0)}
					backgroundColor={Color3.fromRGB(255, 255, 255)}
					backgroundTransparency={0}
				>
					<Frame
						size={new UDim2(props.progress / props.maxProgress, 0, 1, 0)}
						backgroundColor={Color3.fromRGB(71, 255, 0)}
						backgroundTransparency={0}
					>
						<uicorner CornerRadius={new UDim(0, 3)} />
					</Frame>
					<uicorner CornerRadius={new UDim(0, 3)} />
				</Frame>
			)}

			<uicorner CornerRadius={new UDim(0, 3)} />
			<OneThickWhiteStroke />
		</Frame>
	);
}
