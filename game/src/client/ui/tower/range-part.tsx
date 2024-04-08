import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { Workspace } from "@rbxts/services";
import { selectPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { selectPossibleTowerFromId } from "shared/store/tower";

interface RangeModelProps {
	position: Vector3;
	range: number;
	legal: boolean;
}

export function RangeModel({ position, range, legal }: RangeModelProps) {
	return (
		<model>
			<humanoid />
			<part
				Shape={Enum.PartType.Cylinder}
				Size={new Vector3(0.1, range * 2, range * 2)}
				Anchored={true}
				CanCollide={false}
				Color={legal ? Color3.fromRGB(0, 173, 255) : Color3.fromRGB(255, 0, 0)}
				Transparency={0.5}
				CFrame={new CFrame(position).mul(CFrame.Angles(0, 0, math.rad(90)))}
				CastShadow={false}
			/>
			<highlight OutlineColor={new Color3(255, 255, 255)} OutlineTransparency={0} FillTransparency={1} />
		</model>
	);
}

export function RangeIndicator() {
	const possibleTowerFocusId = useSelector(selectPossibleTowerId);
	const possibleTowerFocus = useSelector(
		selectPossibleTowerFromId(possibleTowerFocusId.exists ? possibleTowerFocusId.value : ""),
	);
	if (!possibleTowerFocus.exists) return <></>;

	const towerFocus = possibleTowerFocus.value;

	const { towerType, level, cframe } = towerFocus;
	const { range } = describeTowerFromType(towerType, level);

	return createPortal(<RangeModel position={cframe.Position} range={range} legal={true} />, Workspace, "range-part");
}
