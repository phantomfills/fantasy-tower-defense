import { EnemyType } from "shared/modules/enemy/enemy-type";
import { GenericEnemy } from "./enemy";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { Ninja } from "./ninja";

export function createEnemy(enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy {
	switch (enemyType) {
		case "NINJA": {
			return new Ninja(path);
		}
	}
}
