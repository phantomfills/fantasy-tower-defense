import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import { StrictMode } from "@rbxts/roact";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { App } from "client/ui/app";
import { possible } from "shared/modules/util/possible";
import { RootProvider } from "client/providers/root-provider-component";

const LOCAL_PLAYER = Players.LocalPlayer;

@Controller({})
export class AppController implements OnStart {
	async onStart() {
		const possiblePlayerGui = possible<Instance>(LOCAL_PLAYER.WaitForChild("PlayerGui"));
		if (!possiblePlayerGui.exists) return;

		const playerGui = possiblePlayerGui.value;
		if (!classIs(playerGui, "PlayerGui")) return;

		const appElement = (
			<StrictMode>
				<RootProvider>
					<App />
				</RootProvider>
			</StrictMode>
		);

		const root = createRoot(playerGui);
		root.render(appElement);
	}
}
