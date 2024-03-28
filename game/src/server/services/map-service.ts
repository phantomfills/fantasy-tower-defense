import { Service, OnStart } from "@flamework/core";
import { producer } from "server/store";
import { Enemy, selectEnemies, selectEnemyHealth, selectEnemyIsDead } from "shared/store/enemy";

function getEnemyId(_: Enemy, id: string) {
	return id;
}

@Service({})
export class MapService implements OnStart {
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
	}
}
