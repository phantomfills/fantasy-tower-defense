import { AttackingEnemyType, NonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { Enemy, selectEnemyHealthScaleFactor } from "shared/store/enemy";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { producer } from "server/store";

export function createNonAttackingEnemy(
	enemyType: NonAttackingEnemyType,
	path: number,
	initialPathCompletionAlpha?: number,
): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const healthScaleFactor = producer.getState(selectEnemyHealthScaleFactor);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		health: enemyStats.maxHealth * healthScaleFactor,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		initialPathCompletionAlpha,
		pauses: [],
		dead: false,
		path,
	};

	return enemyTemplate;
}

export function createAttackingEnemy(
	enemyType: AttackingEnemyType,
	path: number,
	initialPathCompletionAlpha?: number,
): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const healthScaleFactor = producer.getState(selectEnemyHealthScaleFactor);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		health: enemyStats.maxHealth * healthScaleFactor,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		initialPathCompletionAlpha,
		pauses: [],
		dead: false,
		path,
	};

	return enemyTemplate;
}
