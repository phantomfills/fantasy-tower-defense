import { OnStart, OnTick, Service } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { getMap } from "shared/store/map";
import { Enemy, getClosestEnemyIdToTower } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { getAttacks, getTowerFromId } from "shared/store/tower";

function addEnemyToStore(enemy: Enemy): void {
	producer.addEnemy(enemy, createId());
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	onStart(): void {
		producer.observe(getAttacks, (attack, _) => {
			const { towerId, damage } = attack;

			const possibleTower = producer.getState(getTowerFromId(towerId));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			const { owner } = tower;

			producer.addMoney(owner, damage);
		});

		const map = producer.getState(getMap);
		const path = map.path;

		task.wait(5);

		for (let i = 0; i < 5; i++) {
			const enemy = createEnemy("STRONG_DUMMY", path);
			addEnemyToStore(enemy);

			task.wait(5);
		}
	}

	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());
	}
}
