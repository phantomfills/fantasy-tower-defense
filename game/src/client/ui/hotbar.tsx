import Roact from "@rbxts/roact";
import { HotbarFrame } from "./hotbar-frame";

export interface HotbarTower {
	placementImageId: number;
	callback: () => void;
}

export interface HotbarProps {
	towers: HotbarTower[];
}

export const Hotbar = (props: HotbarProps) => {
	return (
		<screengui ResetOnSpawn={false}>
			<HotbarFrame {...props} />
		</screengui>
	);
};
