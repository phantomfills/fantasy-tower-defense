import { OnStart, Service } from "@flamework/core";
import { EnemyService } from "./enemy-service";
import { TowerService } from "./tower-service";

@Service()
export class LevelService implements OnStart {
	constructor(private enemyService: EnemyService, private towerService: TowerService) {}

	onStart() {
		this.enemyService.initiate();
		this.towerService.initiate();
	}
}
