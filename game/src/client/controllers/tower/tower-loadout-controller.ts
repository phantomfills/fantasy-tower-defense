import { Controller, OnStart } from "@flamework/core";
import { TowerPlacementController } from "./tower-placement-controller";
import { TowerType } from "../../../shared/modules/tower/tower-type";
import { getTowerPlacementModelFromType } from "shared/modules/tower/tower-type-to-model-map";
import { producer } from "client/store";
import { images } from "shared/assets";
import { getPlacementCostForTower } from "shared/modules/tower/tower-type-to-tower-stats-map";

@Controller({})
export class TowerLoadoutController implements OnStart {
	constructor(private towerPlacementController: TowerPlacementController) {}

	onStart() {
		producer.addTowerSlot({
			number: 1,
			cost: getPlacementCostForTower("ARCHER"),
			icon: images.archer,
			callback: this.getTowerClickHandlerForTowerType("ARCHER"),
		});
	}

	private getTowerClickHandlerForTowerType(_type: TowerType): () => void {
		return () => {
			const towerPrefabModel = getTowerPlacementModelFromType(_type);

			const highlight = new Instance("Highlight");
			highlight.FillTransparency = 1;
			highlight.Parent = towerPrefabModel;

			this.towerPlacementController.setTower(_type, towerPrefabModel);
		};
	}
}
