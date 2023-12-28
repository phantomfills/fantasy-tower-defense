import { OnStart, OnTick, Service } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { store } from "server/store";
import { getMap } from "shared/store/map";
import { Enemy } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";
import { generateUniqueId } from "shared/modules/util/id";

@Service({})
export class EnemyService implements OnStart, OnTick {
	private addEnemyToStore(enemy: Enemy): void {
		store.addEnemy(enemy, generateUniqueId());
	}

	onStart(): void {
		const map = store.getState(getMap);
		const path = map.path;

		task.wait(10);

		for (let i = 0; i < 100_000_000; i++) {
			const weakDummy = createEnemy("WEAK_DUMMY", path);
			this.addEnemyToStore(weakDummy);

			task.wait(1);

			const strongDummy = createEnemy("STRONG_DUMMY", path);
			this.addEnemyToStore(strongDummy);

			task.wait(1);
		}
	}

	onTick(): void {
		store.enemyTick(getCurrentTimeInMilliseconds());
	}
}
