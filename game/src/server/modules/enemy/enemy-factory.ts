import { AttackingEnemyType, NonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { Enemy } from "shared/store/enemy";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

export function createNonAttackingEnemy(enemyType: NonAttackingEnemyType, initialPathCompletionAlpha?: number): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		health: enemyStats.maxHealth,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		initialPathCompletionAlpha,
		pauses: [],
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
		case "KORBLOX_DEATHSPEAKER": {
			return enemyTemplate;
		}
		case "CIRCUIT_BREAKER": {
			return enemyTemplate;
		}
	}
}

export function createAttackingEnemy(enemyType: AttackingEnemyType, initialPathCompletionAlpha?: number): Enemy {
	const enemyStats = describeEnemyFromType(enemyType);

	const enemyTemplate: Enemy = {
		enemyType: enemyType,
		health: enemyStats.maxHealth,
		spawnTimestamp: getCurrentTimeInMilliseconds(),
		initialPathCompletionAlpha,
		pauses: [],
		dead: false,
	};

	switch (enemyType) {
		case "DUMMY_TANK": {
			return enemyTemplate;
		}
	}
}
