import { TowerType } from "shared/modules/tower/tower-type";
import { Tower } from "shared/store/tower/tower-slice";

export function createTower(towerType: TowerType, cframe: CFrame, level: number = 0, owner: number): Tower {
	const towerTemplate = {
		cframe,
		towerType,
		level,
		owner,
	};

	switch (towerType) {
		case "ARCHER": {
			return {
				...towerTemplate,
			};
		}
	}
}
