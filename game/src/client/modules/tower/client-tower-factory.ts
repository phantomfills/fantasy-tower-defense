import { TowerType } from "shared/modules/tower/tower-type";
import { ClientArcher0 } from "./client-archer-0";
import { GenericClientTower } from "./client-tower";
import { ClientArcher1 } from "./client-archer-1";
import { ClientArcher5 } from "./client-archer-5";
import { ClientArcher4 } from "./client-archer-4";
import { ClientArcher3 } from "./client-archer-3";
import { ClientArcher2 } from "./client-archer-2";

export function createClientTower(towerType: TowerType, level: number, id: string, cframe: CFrame): GenericClientTower {
	switch (towerType) {
		case "ARCHER": {
			if (level === 0) {
				return new ClientArcher0(id, cframe);
			} else if (level === 1) {
				return new ClientArcher1(id, cframe);
			} else if (level === 2) {
				return new ClientArcher2(id, cframe);
			} else if (level === 3) {
				return new ClientArcher3(id, cframe);
			} else if (level === 4) {
				return new ClientArcher4(id, cframe);
			} else {
				return new ClientArcher5(id, cframe);
			}
		}
	}
}
