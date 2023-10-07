import { EnemyType } from "shared/modules/enemy-type";
import { GenericEnemy } from "./enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { Ninja } from "./ninja";

export const createEnemy = (enemyType: EnemyType, path: PathWaypoint[]): GenericEnemy => {
	switch (enemyType) {
		case "NINJA": {
			return new Ninja(path);
		}
	}
};
