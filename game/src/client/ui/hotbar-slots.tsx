import Roact from "@rbxts/roact";
import { HotbarSlot } from "./hotbar-slot";

interface HotbarSlotsProps {
	slots: number;
	slotChildren?: ReadonlyArray<Roact.Element>;
}

export const HotbarSlots = (props: HotbarSlotsProps) => {
	const { slots, slotChildren } = props;

	const slotItems = new Array<Roact.Element>();
	for (let i = 0; i < slots; i++) {
		slotItems.push(
			<HotbarSlot key={i} slotNumber={i + 1}>
				{slotChildren ? slotChildren : undefined}
			</HotbarSlot>,
		);
	}

	return <>{...slotItems}</>;
};
