import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";
import { selectPlayerObjectives } from "shared/store/objective";
import { Frame } from "../utils/frame";
import Object from "@rbxts/object-utils";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { objectiveTypeToNameMap } from "shared/modules/game/objective-type-to-name-map";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";

const player = Players.LocalPlayer;
const userId = tostring(player.UserId);

export function Objectives() {
	const possibleObjectives = useSelector(selectPlayerObjectives(userId));
	if (!possibleObjectives.exists) return <></>;

	const objectives = possibleObjectives.value;

	return (
		<Frame size={new UDim2(0.2, 0, 0.5, 0)} position={new UDim2(0, 0, 0.25, 0)}>
			<uigridlayout
				CellSize={new UDim2(1, 0, 0, 20)}
				FillDirection={Enum.FillDirection.Vertical}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				CellPadding={new UDim2(0, 0, 0, 5)}
			/>
			{Object.keys(objectives).map((objective) => {
				const objectiveStatus = objectives[objective];

				const objectiveProgressText = typeIs(objectiveStatus, "boolean")
					? objectiveStatus
						? "Complete"
						: "Incomplete"
					: `(${objectiveStatus.progress}/${objectiveStatus.maxProgress})`;
				const objectiveText = `${objectiveTypeToNameMap[objective]}: ${objectiveProgressText}`;

				return (
					<Frame key={objective} backgroundColor={Color3.fromRGB(0, 0, 0)} backgroundTransparency={0.6}>
						<uipadding PaddingLeft={new UDim(0, 5)} />
						<Label
							text={objectiveText}
							size={new UDim2(1, 0, 1, 0)}
							font={fonts.inter.regular}
							textAlignmentX={Enum.TextXAlignment.Left}
							textColor={Color3.fromRGB(255, 255, 255)}
						/>
						<uicorner CornerRadius={new UDim(0, 3)} />
						<OneThickWhiteStroke />
					</Frame>
				);
			})}
		</Frame>
	);
}
