import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Hotbar } from "client/ui/hotbar";
import { ReplicatedStorage } from "@rbxts/services";

const localPlayer = Players.LocalPlayer;

const assets = ReplicatedStorage.assets;
const towers = assets.towers;
const archer = towers.archer;
const images = archer.images;
const placementImage = images.placement;

@Controller({})
export class TowerController implements OnStart {
	onStart() {
		const playerGui = localPlayer.FindFirstChildOfClass("PlayerGui");
		if (!playerGui) return;

		const root = createRoot(playerGui);
		root.render(
			<Hotbar
				towers={[
					{
						placementImageId: placementImage.Value,
					},
				]}
			/>,
		);

		/**
		 * What will a Hotbar component with Archer tower look like?
		 * <Hotbar towers={
		 *	archer: {
				placementImageId: PLACEMENT_IMAGE_ID
		 }
		 * } />
		 */
	}
}
