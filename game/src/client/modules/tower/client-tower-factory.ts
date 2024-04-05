import { TowerType } from "shared/modules/tower/tower-type";
import { GenericClientTower } from "./client-tower";
import {
	ClientArcher0,
	ClientArcher1,
	ClientArcher2,
	ClientArcher3,
	ClientArcher4,
	ClientArcher5,
} from "./client-archer";
import {
	ClientDummyDefect0,
	ClientDummyDefect1,
	ClientDummyDefect2,
	ClientDummyDefect3,
	ClientDummyDefect4,
	ClientDummyDefect5,
} from "./client-dummy-defect";

export function createClientTower(towerType: TowerType, level: number, id: string, cframe: CFrame): GenericClientTower {
	switch (towerType) {
		case "DUMMY_DEFECT": {
			switch (level) {
				case 0:
					return new ClientDummyDefect0(id, cframe);
				case 1:
					return new ClientDummyDefect1(id, cframe);
				case 2:
					return new ClientDummyDefect2(id, cframe);
				case 3:
					return new ClientDummyDefect3(id, cframe);
				case 4:
					return new ClientDummyDefect4(id, cframe);
				default:
					return new ClientDummyDefect5(id, cframe);
			}
		}
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
