import Roact from "@rbxts/roact";
import { HotbarSlot } from "./hotbar-slot";
import { HotbarTowers } from "./hotbar";

interface HotbarSlotsProps {
	towers: HotbarTowers;
	slotChildren?: ReadonlyArray<Roact.Element>;
}

export const HotbarSlots = (props: HotbarSlotsProps) => {
	const { towers, slotChildren } = props;

	return (
		<>
			{towers.map((tower, index) => {
				return (
					<HotbarSlot
						key={index}
						slotNumber={index + 1}
						imageId={tower.placementImageId}
						callback={tower.callback}
					>
						{slotChildren ? slotChildren : undefined}
					</HotbarSlot>
				);
			})}
		</>
	);
};
