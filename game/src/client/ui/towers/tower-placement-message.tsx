import { Spring, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";
import Roact, { useEffect } from "@rbxts/roact";
import { TowerType } from "shared/modules/tower/tower-type";
import { towerTypeToDisplayNameMap } from "shared/modules/tower/tower-type-to-display-name";
import { fonts } from "../constants/fonts";
import { Theme } from "../constants/theme";

interface TowerPlacementMessageProps {
	towerType: TowerType;
}

function getTowerDisplayNameFromTowerType(towerType: TowerType): string {
	return towerTypeToDisplayNameMap[towerType];
}

export function TowerPlacementMessage({ towerType }: TowerPlacementMessageProps) {
	const [messageShowTransition, setMessageShowTransition] = useMotor(0);
	const [elementAppearTransition, setElementAppearTransition] = useMotor(0);

	const displayName = getTowerDisplayNameFromTowerType(towerType);

	function getLerpBindingForElement(finalPosition: UDim2) {
		return lerpBinding(elementAppearTransition, new UDim2(0, 0, finalPosition.Y.Scale, 0), finalPosition);
	}

	useEffect(() => {
		setMessageShowTransition(
			new Spring(1, {
				dampingRatio: 0.9,
				frequency: 3,
			}),
		);
		setElementAppearTransition(
			new Spring(1, {
				dampingRatio: 0.9,
				frequency: 1,
			}),
		);
	}, []);

	return (
		<frame
			Position={new UDim2(0, 5, 0, 0)}
			Size={lerpBinding(messageShowTransition, new UDim2(0, 0, 1, 0), new UDim2(1, 0, 1, 0))}
			BackgroundColor3={Theme.Overlay1}
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
				TextColor3={Theme.Text}
				FontFace={fonts.inter.bold}
			/>
			<frame
				BorderSizePixel={0}
				BackgroundColor3={Theme.Flamingo}
				Size={getLerpBindingForElement(new UDim2(0.9, 0, 0.015, 0))}
				Position={new UDim2(0.05, 0, 0.25, 0)}
			/>
			<textlabel
				Text="Hold 'R' to rotate"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.325, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={Theme.Text}
				FontFace={fonts.inter.regular}
			/>
			<textlabel
				Text="Press 'Q' to cancel"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.525, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={Theme.Text}
				FontFace={fonts.inter.regular}
			/>
			<textlabel
				Text="Right click to place"
				BackgroundTransparency={1}
				Position={new UDim2(0.05, 0, 0.725, 0)}
				Size={new UDim2(0.9, 0, 0.175, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextScaled={true}
				TextColor3={Theme.Text}
				FontFace={fonts.inter.regular}
			/>
			<uicorner CornerRadius={new UDim(0.05, 0)} />
		</frame>
	);
}
