import Roact from "@rbxts/roact";
import { HotbarSlot } from "./hotbar-slot";

interface HotbarSlotsProps {
	slots: number;
}

export const HotbarSlots = (props: HotbarSlotsProps) => {
	const slotItems = new Array<Roact.Element>();
	for (let i = 0; i < props.slots; i++) {
		slotItems.push(<HotbarSlot slotNumber={i + 1} />);
	}

	return <>{...slotItems}</>;
};
