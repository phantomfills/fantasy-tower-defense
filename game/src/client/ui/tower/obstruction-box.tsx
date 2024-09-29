import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { Workspace } from "@rbxts/services";
import { getTowerObstructionRadius } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { selectTowers } from "shared/store/tower";

interface ObstructionBoxProps {
	position: Vector3;
	obstructionRadius: number;
}

function ObstructionBox({ position, obstructionRadius }: ObstructionBoxProps) {
	return (
		<model>
			<humanoid />
			<part
				Shape={Enum.PartType.Cylinder}
				Size={new Vector3(0.12, obstructionRadius * 2, obstructionRadius * 2)}
				Anchored={true}
				CanCollide={false}
				Color={Color3.fromRGB(255, 0, 0)}
				CFrame={new CFrame(position).mul(CFrame.Angles(0, 0, math.rad(90)))}
				CastShadow={false}
				Material={Enum.Material.SmoothPlastic}
			/>
		</model>
	);
}

export function ObstructionBoxes() {
	const towers = useSelector(selectTowers);

	const towerIds = Object.keys(towers);

	return (
		<>
			{towerIds.map((towerId) => {
				const tower = towers[towerId];
				if (!tower) return <></>;

				return createPortal(
					<ObstructionBox
						position={tower.cframe.Position}
						obstructionRadius={getTowerObstructionRadius(tower.towerType)}
					/>,
					Workspace,
					"obstruction-box",
				);
			})}
		</>
	);
}
