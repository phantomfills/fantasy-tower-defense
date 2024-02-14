import { TowerType } from "shared/modules/tower/tower-type";
import { ClientArcher } from "./client-archer";
import { ClientTower, GenericClientTower } from "./client-tower";

export function createClientTower(towerType: TowerType, id: string, cframe: CFrame): GenericClientTower {
	switch (towerType) {
		case "ARCHER": {
			return new ClientArcher(id, cframe);
		}
	}
}
