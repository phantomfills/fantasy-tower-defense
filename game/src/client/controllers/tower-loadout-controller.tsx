import { Controller, OnStart } from "@flamework/core";
import { TowerPlacementController } from "./tower-placement-controller";
import { Players } from "@rbxts/services";
import { createRoot } from "@rbxts/react-roblox";
import { UserInterface } from "client/ui/user-interface";
import Roact from "@rbxts/roact";
import { TowerType } from "shared/modules/tower-type";
import { towerTypeToModelMap } from "shared/modules/tower-type-to-model";
import { Workspace } from "@rbxts/services";
import { Panel } from "client/ui/panel";

const localPlayer = Players.LocalPlayer;

@Controller({})
export class TowerLoadoutController implements OnStart {
	constructor(private towerPlacementController: TowerPlacementController) {}

	onStart() {
		this.renderLoadout();
	}

	private getTowerClickHandlerForTowerType(towerType: TowerType): () => void {
		return () => {
			const model = towerTypeToModelMap[towerType];

			const towerPrefabModel = model.Clone();
			towerPrefabModel.Parent = Workspace;

			const highlight = new Instance("Highlight");
			highlight.FillTransparency = 1;
			highlight.Parent = towerPrefabModel;

			this.towerPlacementController.setTower(towerType, towerPrefabModel);
		};
	}

	private renderLoadout() {
		const playerGui = localPlayer.FindFirstChildOfClass("PlayerGui");
		if (!playerGui) return;

		const panel = (
			<Panel key="user-interface">
				<UserInterface
					towers={[
						{
							number: 1,
							cost: 100,
							icon: `rbxassetid://2222222222`,
							callback: this.getTowerClickHandlerForTowerType("ARCHER"),
						},
					]}
				/>
			</Panel>
		);

		Roact.mount(panel, playerGui);
	}
}
