import { EnemyType } from "shared/modules/enemy-type";
import { GenericEnemy, PathWaypoint } from "./enemy";
import { Ninja } from "./ninja";

interface CreateEnemy {
	createEnemy(enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy;
}

export class EnemyFactory implements CreateEnemy {
	createEnemy(enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy {
		switch (enemyType) {
			case "NINJA": {
				return new Ninja(path);
			}
		}
	}
}
