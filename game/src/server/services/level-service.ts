import { Service, OnStart } from "@flamework/core";
import { TowerService } from "./tower-service";
import { EnemyService } from "./enemy-service";
import { GenericEnemy } from "server/modules/enemy";
import { GenericTower } from "server/modules/tower";
import { Possible } from "shared/modules/possible-type";

@Service({})
export class LevelService implements OnStart {
	constructor(private towerService: TowerService, private enemyService: EnemyService) {}

	onStart() {
		this.towerService.dealDamageFromTower.Connect((tower, info) => {
			const enemies = this.enemyService.getEnemies();

			const closestEnemyToTower = this.getClosestEnemyToTower(tower, enemies);
			if (!closestEnemyToTower.exists) return;

			closestEnemyToTower.value.takeDamage(info.damage);
		});
	}

	getClosestEnemyToTower(tower: GenericTower, enemies: GenericEnemy[]): Possible<GenericEnemy> {
		const cframe = tower.getStat("cframe");
		const position = cframe.Position;

		if (enemies.isEmpty())
			return {
				exists: false,
			};

		enemies.sort((last, current) => {
			const lastPosition = last.getCFrame().Position;
			const distanceToLast = position.sub(lastPosition).Magnitude;

			const currentPosition = current.getCFrame().Position;
			const distanceToCurrent = position.sub(currentPosition).Magnitude;

			return distanceToLast < distanceToCurrent;
		});

		return {
			exists: true,
			value: enemies[0],
		};
	}
}
