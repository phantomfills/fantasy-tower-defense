import { TowerType } from "shared/modules/tower-type";
import { GenericTower } from "./tower";
import { Archer } from "./archer";

export const createTower = (towerType: TowerType, cframe: CFrame): GenericTower => {
	switch (towerType) {
		case "ARCHER": {
			return new Archer(cframe);
		}
	}
};
