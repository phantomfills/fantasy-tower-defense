import { EnemyType } from "shared/modules/enemy/enemy-type";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { Enemy } from "server/store/enemy";
import { getEnemyStatsFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats";
import { HttpService } from "@rbxts/services";

export function createEnemy(enemyType: EnemyType, path: PathWaypoint[]): Enemy {
	const enemyStats = getEnemyStatsFromType(enemyType);

	const enemyTemplate: Enemy = {
		cframe: new CFrame(),
		health: enemyStats.maxHealth,
		id: HttpService.GenerateGUID(),
		currentWaypointIndex: 0,
		path,
		timestampAtLastWaypoint: DateTime.now().UnixTimestampMillis,
		type: enemyType,
	};

	switch (enemyType) {
		case "NINJA": {
			return enemyTemplate;
		}
	}
}
