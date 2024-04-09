import { OnStart, OnTick, Service } from "@flamework/core";
import { createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import {
	Enemy,
	getEnemyId,
	selectEnemies,
	selectEnemyIsDead,
	selectEnemyPathCompletionAlpha,
} from "shared/store/enemy";

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

	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());
	}
}
