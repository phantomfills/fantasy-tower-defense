import { Controller, OnStart } from "@flamework/core";
import { TowerPlacementController } from "./tower-placement-controller";
import { TowerType } from "shared/modules/tower-type";
import { towerTypeToModelMap } from "shared/modules/tower-type-to-model";
import { Workspace } from "@rbxts/services";
import { rootProducer } from "client/producers/root-provider";
import { images } from "shared/assets";

@Controller({})
export class TowerLoadoutController implements OnStart {
	constructor(private towerPlacementController: TowerPlacementController) {}

	onStart() {
		rootProducer.addTower({
			number: 1,
			cost: 1000,
			icon: images.cash,
			callback: this.getTowerClickHandlerForTowerType("ARCHER"),
		});

		task.wait(5);

		rootProducer.addTower({
			number: 2,
			cost: 2500,
			icon: images.heart_glow,
			callback: this.getTowerClickHandlerForTowerType("ARCHER"),
		});
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
}
