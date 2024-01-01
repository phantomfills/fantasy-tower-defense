import { TowerType } from "shared/modules/tower/tower-type";
import { Tower } from "shared/store/tower/tower-slice";

export function createTower(towerType: TowerType, cframe: CFrame, level: number = 0): Tower {
	const towerTemplate = {
		cframe: cframe,
		towerType: towerType,
		level,
	};

	switch (towerType) {
		case "ARCHER": {
			return {
				...towerTemplate,
			};
		}
	}
}
