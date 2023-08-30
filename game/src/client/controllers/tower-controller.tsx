import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Hotbar } from "client/ui/hotbar";

const localPlayer = Players.LocalPlayer;

@Controller({})
export class TowerController implements OnStart {
	onStart() {
		const playerGui = localPlayer.FindFirstChildOfClass("PlayerGui");
		if (!playerGui) return;

		const root = createRoot(playerGui);
		root.render(<Hotbar slots={5}></Hotbar>);
	}
}
