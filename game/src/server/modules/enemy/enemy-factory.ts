import { AttackingEnemyType, EnemyType, NonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { Enemy } from "shared/store/enemy";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

export function createNonAttackingEnemy(
	enemyType: NonAttackingEnemyType,
	path: PathWaypoint[],
	initialPathCompletionAlpha?: number,
): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		health: enemyStats.maxHealth,
		path,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		pathCompletionAlpha: 0,
		initialPathCompletionAlpha,
		dead: false,
	};

	switch (enemyType) {
		case "TRAINING_DUMMY": {
			return enemyTemplate;
		}
		case "ARMORED_DUMMY": {
			return enemyTemplate;
		}
		case "SPEEDSTER_DUMMY": {
			return enemyTemplate;
		}
		case "STEALTH_DUMMY": {
			return enemyTemplate;
		}
		case "MULTIPLIER_DUMMY": {
			return enemyTemplate;
		}
		case "DIVIDED_DUMMY": {
			return enemyTemplate;
		}
		case "GUARD_DUMMY": {
			return enemyTemplate;
		}
		case "IMPOSTOR": {
			return enemyTemplate;
		}
		case "CRITICAL_SPORTS_CAR": {
			return enemyTemplate;
		}
	}
}

export function createAttackingEnemy(
	enemyType: AttackingEnemyType,
	path: PathWaypoint[],
	initialPathCompletionAlpha?: number,
): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		random: math.random() * 2147483648,
		health: enemyStats.maxHealth,
		path,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		pathCompletionAlpha: 0,
		initialPathCompletionAlpha,
		dead: false,
	};

	switch (enemyType) {
		case "DUMMY_TANK": {
			return enemyTemplate;
		}
	}
}
