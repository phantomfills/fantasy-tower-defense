import { Spring, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";
import Roact, { useEffect } from "@rbxts/roact";
import { TowerType } from "shared/modules/tower/tower-type";
import { towerTypeToDisplayNameMap } from "shared/modules/tower/tower-type-to-display-name";
import { fonts } from "../constants/fonts";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";

interface TowerPlacementMessageTextProps {
	text: string;
	position: UDim2;
	font: typeof fonts.inter.regular | typeof fonts.inter.bold;
}

interface TowerPlacementMessageProps {
	towerType: TowerType;
}

function getTowerDisplayNameFromTowerType(towerType: TowerType): string {
	return towerTypeToDisplayNameMap[towerType];
}

function TowerPlacementMessageText({ text, position, font }: TowerPlacementMessageTextProps) {
	return (
		<Label
			text={text}
			position={position}
			font={font}
			size={new UDim2(0.9, 0, 0.175, 0)}
			textAlignmentX={Enum.TextXAlignment.Left}
			textColor={new Color3(1, 1, 1)}
		/>
	);
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
		<Frame
			position={new UDim2(0, 5, 0, 0)}
			size={lerpBinding(messageShowTransition, new UDim2(0, 0, 1, 0), new UDim2(1, 0, 1, 0))}
			backgroundColor={new Color3(0, 0, 0)}
			backgroundTransparency={0.75}
		>
			<OneThickWhiteStroke />
			<TowerPlacementMessageText
				text={`Placing ${displayName}`}
				position={new UDim2(0.05, 0, 0.05, 0)}
				font={fonts.inter.bold}
			/>
			<Frame
				backgroundTransparency={0}
				backgroundColor={new Color3(0, 0.82, 1)}
				size={getLerpBindingForElement(new UDim2(0.9, 0, 0.015, 0))}
				position={new UDim2(0.05, 0, 0.25, 0)}
			/>
			<TowerPlacementMessageText
				text="Hold 'R' to rotate"
				position={new UDim2(0.05, 0, 0.325, 0)}
				font={fonts.inter.regular}
			/>
			<TowerPlacementMessageText
				text="Press 'Q' to cancel"
				position={new UDim2(0.05, 0, 0.525, 0)}
				font={fonts.inter.regular}
			/>
			<TowerPlacementMessageText
				text="Left click to place"
				position={new UDim2(0.05, 0, 0.725, 0)}
				font={fonts.inter.regular}
			/>
			<uicorner CornerRadius={new UDim(0.05, 0)} />
		</Frame>
	);
}
