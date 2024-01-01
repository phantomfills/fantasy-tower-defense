import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import { StrictMode } from "@rbxts/roact";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { App } from "client/ui/app";
import { possible } from "shared/modules/utils/possible";
import { RootProvider } from "client/store";
import { ErrorBoundary } from "client/ui/error-boundary";

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
				<ErrorBoundary
					fallback={(exception) => (
						<textlabel Text={`Error loading UI: ${error} \n Rejoin?`} Size={new UDim2(1, 0, 1, 0)} />
					)}
				>
					<RootProvider>
						<App />
					</RootProvider>
				</ErrorBoundary>
			</StrictMode>
		);

		const root = createRoot(playerGui);
		root.render(appElement);
	}
}
