import { TowerType } from "shared/modules/tower/tower-type";
import { ClientArcher } from "./client-archer";
import { ClientTower } from "./client-tower";

export function createClientTower(towerType: TowerType, id: string, cframe: CFrame): ClientTower {
	switch (towerType) {
		case "ARCHER": {
			return new ClientArcher(id, cframe);
		}
	}
}
