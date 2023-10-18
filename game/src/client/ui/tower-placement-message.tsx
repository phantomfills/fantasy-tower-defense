import Roact from "@rbxts/roact";
import { TowerType } from "shared/modules/tower-type";
import { towerTypeToDisplayNameMap } from "shared/modules/tower-type-to-display-name";

interface TowerPlacementMessageProps {
	towerType: TowerType;
}

function getTowerDisplayNameFromTowerType(towerType: TowerType): string {
	return towerTypeToDisplayNameMap[towerType];
}

export function TowerPlacementMessage({ towerType }: TowerPlacementMessageProps) {
	const displayName = getTowerDisplayNameFromTowerType(towerType);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={Color3.fromRGB(0, 0, 0)} Transparency={0.5}>
			<textlabel
				Text={`Placing ${displayName}`}
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.05, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={new Color3(255, 255, 255)}
				Font={Enum.Font.GothamBold}
			/>
			<frame
				BorderSizePixel={0}
				BackgroundColor3={new Color3(255, 255, 255)}
				Size={new UDim2(0.9, 0, 0.015, 0)}
				Position={new UDim2(0.05, 0, 0.25, 0)}
			/>
			<textlabel
				Text="Hold 'R' to rotate"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.325, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={new Color3(255, 255, 255)}
				Font={Enum.Font.GothamBold}
			/>
			<textlabel
				Text="Press 'Q' to cancel"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.525, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={new Color3(255, 255, 255)}
				Font={Enum.Font.GothamBold}
			/>
			<textlabel
				Text="Right click to place"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.725, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={new Color3(255, 255, 255)}
				Font={Enum.Font.GothamBold}
			/>
			<uicorner CornerRadius={new UDim(0.05, 0)} />
		</frame>
	);
}
