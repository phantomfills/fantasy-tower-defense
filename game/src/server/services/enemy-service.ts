import { OnStart, OnTick, Service } from "@flamework/core";
import { createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { isAttackingEnemy, isAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import {
	Enemy,
	getEnemyId,
	selectAttackingEnemyIds,
	selectEnemies,
	selectEnemyFromId,
	selectEnemyIsDead,
	selectEnemyPathCompletionAlpha,
} from "shared/store/enemy";
import { selectClosestTowerIdToPosition } from "shared/store/tower";

function handleEnemyIsDead(enemy: Enemy, id: string, isDead: boolean) {
	if (!isDead) return;

	if (enemy.enemyType === "MULTIPLIER_DUMMY") {
		const pathCompletionAlpha = producer.getState(selectEnemyPathCompletionAlpha(id));

		const spawnedEnemy = createNonAttackingEnemy("DIVIDED_DUMMY", enemy.path, pathCompletionAlpha);
		producer.addEnemy(spawnedEnemy, createId());
	}

	producer.removeEnemy(id);
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	private lastEnemyAttackCycle: number = getCurrentTimeInMilliseconds();

	onStart() {
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

	randomlyAttackTower() {
		const attackingEnemies = producer.getState(selectAttackingEnemyIds);

		for (const enemyId of attackingEnemies) {
			const possibleEnemyId = producer.getState(selectEnemyFromId(enemyId));
			if (!possibleEnemyId.exists) continue;

			const enemy = possibleEnemyId.value;
			if (!isAttackingEnemy(enemy)) continue;

			const numberRange: [number, number] = [0, 10];
			const random = math.random(numberRange[0], numberRange[1]);

			const enemyRng = new Random(enemy.rng);
			const enemyRandom = enemyRng.NextInteger(numberRange[0], numberRange[1]);

			if (enemyRandom !== random) continue;

			const possibleClosestTowerId = producer.getState(
				selectClosestTowerIdToPosition(
					getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha).Position,
				),
			);
			if (!possibleClosestTowerId.exists) continue;

			const towerId = possibleClosestTowerId.value;
			producer.damageTower(towerId, 50);
			producer.addPause(enemyId, {
				startTime: getCurrentTimeInMilliseconds(),
				pauseFor: 3000,
			});
		}
	}

	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());

		const nextEnemyAttackCycle = this.lastEnemyAttackCycle + 1000;
		if (getCurrentTimeInMilliseconds() < nextEnemyAttackCycle) return;

		this.lastEnemyAttackCycle = getCurrentTimeInMilliseconds();

		this.randomlyAttackTower();
	}
}
