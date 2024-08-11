import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectPlayersCanPlaceTowers } from "shared/store/level";
import { selectTowerLoadout } from "client/store/tower-loadout";
import { TowerSlot } from "./tower-slot";
import { Group } from "../utils/group";

export function TowerLoadout() {
	const playersCanPlaceTowers = useSelector(selectPlayersCanPlaceTowers);
	const towerLoadout = useSelector(selectTowerLoadout);

	if (!playersCanPlaceTowers || !towerLoadout) return <></>;

	return (
		<Group position={new UDim2(0, 0, 0.85, 0)} size={new UDim2(1, 0, 0.15, 0)} zIndex={1}>
			<uigridlayout
				CellSize={new UDim2(0.075, 0, 1, 0)}
				CellPadding={new UDim2(0.025, 0, 0, 0)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			{towerLoadout.map((tower, index) => (
				<TowerSlot
					number={tower.number}
					icon={tower.icon}
					cost={tower.cost}
					callback={tower.callback}
					key={`tower-slot-${index}`}
				/>
			))}
		</Group>
	);
}
