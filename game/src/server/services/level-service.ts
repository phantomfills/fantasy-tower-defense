import { Service, OnStart } from "@flamework/core";
import { TowerService } from "./tower-service";
import { EnemyService } from "./enemy-service";

@Service({})
export class LevelService implements OnStart {
	constructor(private towerService: TowerService, private enemyService: EnemyService) {}

	onStart() {
		this.towerService.dealDamageFromTower.Connect((tower, info) => {
			this.enemyService.dealDamageToClosestEnemyInRange(tower, info);
		});
	}
}
