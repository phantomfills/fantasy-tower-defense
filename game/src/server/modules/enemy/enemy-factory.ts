import { EnemyType } from "shared/modules/enemy/enemy-type";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { Enemy } from "shared/store/enemy";
import { getEnemyStatsFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";

export function createEnemy(enemyType: EnemyType, path: PathWaypoint[]): Enemy {
	const enemyStats = getEnemyStatsFromType(enemyType);

	const enemyTemplate: Enemy = {
		type: enemyType,
		health: enemyStats.maxHealth,
		path,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		pathCompletionAlpha: 0,
	};

	switch (enemyType) {
		case "WEAK_DUMMY": {
			return enemyTemplate;
		}
		case "STRONG_DUMMY": {
			return enemyTemplate;
		}
	}
}
