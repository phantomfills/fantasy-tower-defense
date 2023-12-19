import { TowerType } from "shared/modules/tower/tower-type";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";
import { Tower } from "shared/store/tower/tower-slice";

export function createTower(towerType: TowerType, cframe: CFrame): Tower {
	const towerTemplate = {
		cframe: cframe,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		attackCount: 0,
		type: towerType,
	};

	switch (towerType) {
		case "ARCHER": {
			return {
				...towerTemplate,
				health: 500,
				attackDamage: 60,
				attackIntervalTimestamp: 550,
			};
		}
	}
}
