import { Service } from "@flamework/core";
import { TowerService } from "./tower-service";
import { EnemyService } from "./enemy-service";
import { PathWaypoint } from "shared/modules/path-waypoint";

@Service({})
export class CombatService {
	constructor(private towerService: TowerService, private enemyService: EnemyService) {}

	async start(path: PathWaypoint[]) {
		this.towerService.dealDamageFromTower.Connect((tower, info) => {
			this.enemyService.dealDamageToClosestEnemyInRange(tower, info);
		});

		this.towerService.start();
		await this.enemyService.start(path);
	}

	tick() {
		this.enemyService.tick();
	}
}
