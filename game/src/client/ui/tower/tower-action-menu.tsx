import Roact from "@rbxts/roact";
import { TowerType } from "shared/modules/tower/tower-type";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { getTowerDisplayNameFromType } from "shared/modules/tower/tower-type-to-display-name-map";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { useSelector } from "@rbxts/react-reflex";
import { getTowerFromId } from "shared/store/tower";

interface TowerActionMenuProps {
	towerId: string;
	actions: {
		upgrade: () => void;
	};
}

export function TowerActionMenu({ towerId, actions }: TowerActionMenuProps) {
	const possibleTower = useSelector(getTowerFromId(towerId));
	if (!possibleTower.exists) {
		return <></>;
	}

	const tower = possibleTower.value;
	const { towerType, level } = tower;

	const towerDisplayName = `${getTowerDisplayNameFromType(towerType)} Lv. ${level}`;
	const rem = useRem();

	return (
		<Frame
			size={new UDim2(0.2, 0, 0.6, 0)}
			position={new UDim2(0, 0, 0.2, 0)}
			backgroundTransparency={0.5}
			backgroundColor={new Color3(0, 0, 0)}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<OneThickWhiteStroke />
			<Label
				size={new UDim2(1, 0, 0.15, 0)}
				textSize={rem(4)}
				font={fonts.inter.bold}
				text={towerDisplayName}
				textColor={new Color3(255, 255, 255)}
			/>
			<textbutton
				Size={new UDim2(1, -30, 0.15, 0)}
				Position={new UDim2(0, 15, 0.15, 0)}
				Text="Upgrade"
				Event={{ MouseButton1Click: actions.upgrade }}
			/>
		</Frame>
	);
}
