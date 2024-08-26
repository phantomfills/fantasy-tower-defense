import { TowerType } from "shared/modules/tower/tower-type";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { Tower } from "shared/store/tower/tower-slice";

export function createTower(
	towerType: TowerType,
	cframe: CFrame,
	level: number = 0,
	owner: string,
	currentTimestamp: number,
): Tower {
	const towerTemplate = {
		cframe,
		towerType,
		level,
		owner,
		attack: {
			exists: false,
		},
		lastAttackTimestamp: currentTimestamp,
		lastHealTimestamp: currentTimestamp,
		health: describeTowerFromType(towerType, level).maxHealth,
	} as const;

	switch (towerType) {
		case "DUMMY_DEFECT": {
			return {
				...towerTemplate,
			};
		}
		case "ARCHER": {
			return {
				...towerTemplate,
			};
		}
		case "OFFICER": {
			return {
				...towerTemplate,
			};
		}
	}
}
