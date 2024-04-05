import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { selectPossibleTowerFromId } from "shared/store/tower";

interface RangePartProps {
	position: Vector3;
	range: number;
	legal: boolean;
}

export function RangePart({ position, range, legal }: RangePartProps) {
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

interface RangePartFromIdProps {
	towerId: string;
}

export function RangePartFromId({ towerId }: RangePartFromIdProps) {
	const possibleTower = useSelector(selectPossibleTowerFromId(towerId));
	if (!possibleTower.exists) {
		return <></>;
	}

	const { towerType, level, cframe } = possibleTower.value;
	const { range } = describeTowerFromType(towerType, level);

	return <RangePart position={cframe.Position} range={range} legal={true} />;
}
