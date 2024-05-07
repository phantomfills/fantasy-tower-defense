import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { useSelector } from "@rbxts/react-reflex";
import { selectPlayersCanPlaceTower } from "shared/store/dialog";
import { selectTowerLoadout } from "client/store/tower-loadout";
import { TowerSlot } from "./tower-slot";

export function TowerLoadout() {
	const playersCanPlaceTower = useSelector(selectPlayersCanPlaceTower);
	const towerLoadout = useSelector(selectTowerLoadout);

	if (!playersCanPlaceTower || !towerLoadout) return <></>;

	return (
		<Frame position={new UDim2(0, 0, 0.8, 0)} size={new UDim2(1, 0, 0.2, 0)} zIndex={1}>
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
		</Frame>
	);
}
