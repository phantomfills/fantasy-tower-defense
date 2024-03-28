import { OnStart, OnTick, Service } from "@flamework/core";
import { producer } from "server/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { getEnemyId, selectEnemies, selectEnemyIsDead } from "shared/store/enemy";

@Service({})
export class EnemyService implements OnStart, OnTick {
	onStart() {
		producer.observe(selectEnemies, getEnemyId, (_, id) => {
			const unsubscribe = producer.subscribe(selectEnemyIsDead(id), (isDead) => {
				if (!isDead) return;

				producer.removeEnemy(id);
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
