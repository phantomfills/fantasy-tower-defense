import { Service, OnStart } from "@flamework/core";
import { TowerService } from "./tower-service";
import { EnemyService } from "./enemy-service";
import { GenericEnemy } from "server/modules/enemy";
import { GenericTower } from "server/modules/tower";
import { Possible } from "shared/modules/possible";

@Service({})
export class LevelService implements OnStart {
	constructor(private towerService: TowerService, private enemyService: EnemyService) {}

	onStart() {
		this.towerService.dealDamageFromTower.Connect((tower, info) => {
			this.enemyService.dealDamageToClosestEnemy(tower, info);
		});
	}
}
