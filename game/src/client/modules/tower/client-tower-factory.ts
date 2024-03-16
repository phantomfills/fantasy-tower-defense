import { TowerType } from "shared/modules/tower/tower-type";
import { ClientArcher0 } from "./client-archer-0";
import { GenericClientTower } from "./client-tower";
import { ClientArcher1 } from "./client-archer-1";

export function createClientTower(towerType: TowerType, level: number, id: string, cframe: CFrame): GenericClientTower {
	switch (towerType) {
		case "ARCHER": {
			if (level === 0) {
				return new ClientArcher0(id, cframe);
			} else {
				return new ClientArcher1(id, cframe);
			}
		}
	}
}
