import Roact from "@rbxts/roact";
import { HotbarFrame } from "./hotbar-frame";

export interface HotbarProps {
	slots: number;
}

export const Hotbar = (props: HotbarProps) => {
	return (
		<screengui ResetOnSpawn={false}>
			<HotbarFrame {...props} />
		</screengui>
	);
};
