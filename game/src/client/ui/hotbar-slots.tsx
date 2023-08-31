import Roact from "@rbxts/roact";
import { HotbarSlot } from "./hotbar-slot";
import { HotbarTowers } from "./hotbar";

interface HotbarSlotsProps {
	towers: HotbarTowers;
	slotChildren?: ReadonlyArray<Roact.Element>;
}

export const HotbarSlots = (props: HotbarSlotsProps) => {
	const { towers, slotChildren } = props;

	// const slotItems = new Array<Roact.Element>();
	// // eslint-disable-next-line roblox-ts/no-any
	// for (let i = 0; i < slots; i++) {
	// 	slotItems.push(
	// 		<HotbarSlot key={i} slotNumber={i + 1}>
	// 			{slotChildren ? slotChildren : undefined}
	// 		</HotbarSlot>,
	// 	);

	return (
		<>
			{towers.map((tower, index) => {
				return (
					<HotbarSlot key={index} slotNumber={index + 1} imageId={tower.placementImageId}>
						{slotChildren ? slotChildren : undefined}
					</HotbarSlot>
				);
			})}
		</>
	);
};
