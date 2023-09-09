import { TowerType } from "shared/modules/tower-type";
import { GenericTower } from "./tower";
import { Archer } from "./archer";

interface CreateTower {
	createTower(towerType: TowerType, cframe: CFrame): GenericTower;
}

export class TowerFactory implements CreateTower {
	createTower(towerType: TowerType, cframe: CFrame): GenericTower {
		switch (towerType) {
			case "ARCHER": {
				return new Archer(cframe);
			}
		}
	}
}
