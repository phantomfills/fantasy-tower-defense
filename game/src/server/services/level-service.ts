import { OnStart, Service } from "@flamework/core";
import { EnemyService } from "./enemy-service";
import { TowerService } from "./tower-service";

@Service()
export class LevelService implements OnStart {
	constructor(private enemyService: EnemyService, private towerService: TowerService) {}

	onStart() {
		this.enemyService.initiate();

		const getEnemies = () => {
			return this.getEnemies();
		};

		this.towerService.initiate(getEnemies);
	}

	getEnemies() {
		return this.enemyService.getEnemies();
	}
}
