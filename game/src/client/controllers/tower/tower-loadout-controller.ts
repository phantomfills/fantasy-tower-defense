import { Controller, OnStart } from "@flamework/core";
import { TowerPlacementController } from "./tower-placement-controller";
import { TowerType } from "../../../shared/modules/tower/tower-type";
import { producer } from "client/store";
import { images } from "shared/assets";
import { getPlacementCostForTower } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";

@Controller({})
export class TowerLoadoutController implements OnStart {
	constructor(private towerPlacementController: TowerPlacementController) {}

	onStart() {
		producer.addTowerSlot({
			number: 1,
			cost: getPlacementCostForTower("OFFICER"),
			icon: images.archer,
			callback: this.getTowerClickHandlerForTowerType("OFFICER"),
		});
		producer.addTowerSlot({
			number: 2,
			cost: getPlacementCostForTower("DUMMY_DEFECT"),
			icon: images.dummy_defect_icon,
			callback: this.getTowerClickHandlerForTowerType("DUMMY_DEFECT"),
		});
		producer.addTowerSlot({
			number: 3,
			cost: getPlacementCostForTower("ARCHER"),
			icon: images.archer,
			callback: this.getTowerClickHandlerForTowerType("ARCHER"),
		});
	}

	private getTowerClickHandlerForTowerType(_type: TowerType): () => void {
		return () => {
			const towerPrefabModel = getTowerModel(_type, 0);

			const highlight = new Instance("Highlight");
			highlight.FillTransparency = 1;
			highlight.Parent = towerPrefabModel;

			this.towerPlacementController.setTower(_type, towerPrefabModel);
		};
	}
}
