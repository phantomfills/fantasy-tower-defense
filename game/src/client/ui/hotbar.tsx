import Roact from "@rbxts/roact";
import { HotbarFrame } from "./hotbar-frame";

export interface HotbarTower {
	placementImageId: number;
}

export type HotbarTowers = HotbarTower[];

export interface HotbarProps {
	towers: HotbarTowers;
}

export const Hotbar = (props: HotbarProps) => {
	return (
		<screengui ResetOnSpawn={false}>
			<HotbarFrame {...props} />
		</screengui>
	);
};
