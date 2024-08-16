import { OnStart, OnTick, Service } from "@flamework/core";
import { attackTower } from "server/events";
import { createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyAttack } from "shared/modules/attack";
import { describeEnemyAttackFromType } from "shared/modules/enemy/enemy-attack-to-config-map";
import { isAttackingEnemy } from "shared/modules/enemy/enemy-type";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import {
	Enemy,
	getEnemyId,
	Pause,
	selectAttackingEnemyIds,
	selectEnemies,
	selectEnemyFromId,
	selectEnemyHealth,
	selectEnemyIsDead,
	selectEnemyPathCompletionAlpha,
} from "shared/store/enemy";
import { selectMapType } from "shared/store/level";
import { selectClosestTowerIdToPosition } from "shared/store/tower";

function handleEnemyIsDead(enemy: Enemy, id: string, isDead: boolean) {
	if (!isDead) return;

	// TODO: Add functionality to handle special enemy deaths (such as spawning children)

	producer.removeEnemy(id);
}

function getEnemyIdsWhichHaveReachedPathEnd(): string[] {
	const enemyIds: string[] = [];
	const currentTimeInMilliseconds = getCurrentTimeInMilliseconds();

	const enemies = producer.getState(selectEnemies);
	for (const [id, _] of pairs(enemies)) {
		const pathCompletionAlpha = producer.getState(selectEnemyPathCompletionAlpha(id, currentTimeInMilliseconds));
		if (pathCompletionAlpha < 1) continue;
		enemyIds.push(id);
	}

	return enemyIds;
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	private lastEnemyAttackCycle: number = getCurrentTimeInMilliseconds();

	onStart() {
		producer.observe(selectEnemies, getEnemyId, (_, id) => {
			let enemyDied = false;
			let enemyHealth = 0;

			const unsubscribeEnemyIsDead = producer.subscribe(selectEnemyIsDead(id), (isDead) => {
				enemyDied = isDead;
			});

			const unsubscribeEnemyHealth = producer.subscribe(selectEnemyHealth(id), (health) => {
				enemyHealth = health.exists ? health.value : 0;
			});

			return () => {
				producer.deductLives(enemyHealth);
				unsubscribeEnemyIsDead();
				unsubscribeEnemyHealth();
			};
		});

		producer.observe(selectEnemies, getEnemyId, (enemy, id) => {
			handleEnemyIsDead(enemy, id, producer.getState(selectEnemyIsDead(id)));

			const unsubscribe = producer.subscribe(selectEnemyIsDead(id), (isDead) => {
				handleEnemyIsDead(enemy, id, isDead);
				unsubscribe();
			});

			return () => {
				unsubscribe();
			};
		});
	}

	triggerRandomChanceForTowerAttack() {
		const attackingEnemies = producer.getState(selectAttackingEnemyIds);

		for (const enemyId of attackingEnemies) {
			const possibleEnemyId = producer.getState(selectEnemyFromId(enemyId));
			if (!possibleEnemyId.exists) continue;

			const enemy = possibleEnemyId.value;
			if (!isAttackingEnemy(enemy)) continue;

			const { attacks } = describeEnemyFromType(enemy.enemyType);

			attacks.forEach((attackType) => {
				const { damage, chanceUpperBound } = describeEnemyAttackFromType(attackType);

				const numberRange: [number, number] = [0, chanceUpperBound];

				const enemyRandom = math.random(numberRange[0], numberRange[1]);
				if (enemyRandom !== 0) return;

				const path = getGameMapFromMapType(producer.getState(selectMapType)).paths[enemy.path];
				const pathCompletionAlpha = producer.getState(
					selectEnemyPathCompletionAlpha(enemyId, getCurrentTimeInMilliseconds()),
				);
				const possibleClosestTowerId = producer.getState(
					selectClosestTowerIdToPosition(
						getCFrameFromPathCompletionAlpha(path, pathCompletionAlpha).Position,
					),
				);
				if (!possibleClosestTowerId.exists) return;

				const towerId = possibleClosestTowerId.value;
				const enemyAttack: EnemyAttack = {
					attackType,
					damage,
					enemyId,
					towerId,
				};

				attackTower.Fire(enemyAttack);
			});
		}
	}

	onTick() {
		const currentTime = getCurrentTimeInMilliseconds();

		const enemyIdsWhichHaveReachedPathEnd = getEnemyIdsWhichHaveReachedPathEnd();
		enemyIdsWhichHaveReachedPathEnd.forEach((id) => {
			producer.removeEnemy(id);
		});

		const nextEnemyAttackCycle = this.lastEnemyAttackCycle + 1000;
		if (currentTime < nextEnemyAttackCycle) return;

		this.lastEnemyAttackCycle = currentTime;

		this.triggerRandomChanceForTowerAttack();
	}
}
