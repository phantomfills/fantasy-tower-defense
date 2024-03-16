import { EnemyType } from "shared/modules/enemy/enemy-type";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { Enemy } from "shared/store/enemy";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

export function createEnemy(enemyType: EnemyType, path: PathWaypoint[]): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const enemyTemplate: Enemy = {
		type: enemyType,
		health: enemyStats.maxHealth,
		path,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		pathCompletionAlpha: 0,
	};

	switch (enemyType) {
		case "TRAINING_DUMMY": {
			return enemyTemplate;
		}
		case "ARMORED_DUMMY": {
			return enemyTemplate;
		}
	}
}
