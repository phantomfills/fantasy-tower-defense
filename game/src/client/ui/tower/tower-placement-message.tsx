import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { useRem } from "../hooks/use-rem";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { useSelector } from "@rbxts/react-reflex";
import { selectPossibleTowerPlacement } from "client/store/tower-loadout";
import { Group } from "../utils/group";
import { getTowerDisplayNameFromType } from "shared/modules/tower/tower-type-to-display-name-map";
import { style } from "client/constants/style";

export function TowerPlacementMessage() {
	const rem = useRem();

	const possibleTowerPlacement = useSelector(selectPossibleTowerPlacement);
	if (!possibleTowerPlacement.exists) {
		return <></>;
	}

	return (
		<Group size={new UDim2(0.5, 0, 0.15, 0)} position={new UDim2(0.25, 0, 0.1, 0)}>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, rem(1))} />
			<Label
				text={`Placing ${getTowerDisplayNameFromType(possibleTowerPlacement.value.towerType)}`}
				size={new UDim2(1, 0, 0.3, 0)}
				font={fonts.inter.bold}
				textColor={style.white}
				textSize={rem(2)}
				backgroundColor={style.black}
				backgroundTransparency={0.6}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
			</Label>
			<Label
				text="Press R to rotate."
				size={new UDim2(1, 0, 0.3, 0)}
				font={fonts.inter.bold}
				textColor={style.white}
				textSize={rem(2)}
				backgroundColor={style.black}
				backgroundTransparency={0.6}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
			</Label>
			<Label
				text="Press Q to cancel."
				size={new UDim2(1, 0, 0.3, 0)}
				position={new UDim2(0, 0, 0, 0)}
				font={fonts.inter.bold}
				textColor={style.white}
				textSize={rem(2)}
				backgroundColor={style.black}
				backgroundTransparency={0.6}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
			</Label>
			<Label
				text="Press LMB / DOUBLE TAP to place."
				size={new UDim2(1, 0, 0.3, 0)}
				position={new UDim2(0, 0, 0, 0)}
				font={fonts.inter.bold}
				textColor={style.white}
				textSize={rem(2)}
				backgroundColor={style.black}
				backgroundTransparency={0.6}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
			</Label>
		</Group>
	);
}
