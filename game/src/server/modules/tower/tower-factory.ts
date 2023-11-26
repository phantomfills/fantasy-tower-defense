import { TowerType } from "../../../shared/modules/tower/tower-type";
import { GenericTower } from "../../../shared/modules/tower/tower";
import { Archer } from "./archer";

export function createTower(towerType: TowerType, cframe: CFrame): GenericTower {
	switch (towerType) {
		case "ARCHER": {
			return new Archer(cframe);
		}
	}
}
