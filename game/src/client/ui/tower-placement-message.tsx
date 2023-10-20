import { Spring, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";
import Roact, { useEffect } from "@rbxts/roact";
import { TowerType } from "shared/modules/tower-type";
import { towerTypeToDisplayNameMap } from "shared/modules/tower-type-to-display-name";

interface TowerPlacementMessageProps {
	towerType: TowerType;
}

function getTowerDisplayNameFromTowerType(towerType: TowerType): string {
	return towerTypeToDisplayNameMap[towerType];
}

export function TowerPlacementMessage({ towerType }: TowerPlacementMessageProps) {
	const [messageShowTransition, setMessageShowTransition] = useMotor(0);

	const displayName = getTowerDisplayNameFromTowerType(towerType);

	useEffect(() => {
		setMessageShowTransition(
			new Spring(1, {
				dampingRatio: 0.9,
				frequency: 3,
			}),
		);
	});

	return (
		<frame
			Position={new UDim2(0, 5, 0, 0)}
			Size={lerpBinding(messageShowTransition, new UDim2(1, 0, 0, 0), new UDim2(1, 0, 1, 0))}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			Transparency={0.5}
		>
			<uistroke Thickness={1} Color={new Color3(255, 255, 255)} />
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
