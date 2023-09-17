import { EnemyType } from "shared/modules/enemy-type";
import { GenericEnemy } from "./enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { Ninja } from "./ninja";
import { Events } from "server/network";

interface CreateEnemy {
	createEnemy(enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy;
}

export class EnemyFactory implements CreateEnemy {
	createEnemy(enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy {
		let enemy: GenericEnemy;

		switch (enemyType) {
			case "NINJA": {
				enemy = new Ninja(path);
			}
		}

		Events.createEnemy.broadcast(enemyType, enemy.getId(), path[0]);
		return enemy;
	}
}
