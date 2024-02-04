import { OnStart, OnTick, Service } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { getMap } from "shared/store/map";
import { Enemy } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";

function addEnemyToStore(enemy: Enemy): void {
	producer.addEnemy(enemy, createId());
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	onStart(): void {
		const map = producer.getState(getMap);
		const path = map.path;

		task.wait(5);

		for (;;) {
			const enemy = createEnemy("WEAK_DUMMY", path);
			addEnemyToStore(enemy);

			task.wait(0.1);
		}
	}

	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());
	}
}
