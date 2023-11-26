import { OnStart, OnTick, Service } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { store } from "server/store";
import { getMap } from "shared/store/map";
import { Enemy } from "shared/store/enemy";

@Service({})
export class EnemyService implements OnStart, OnTick {
	private addEnemy(enemy: Enemy): void {
		store.addEnemy(enemy);
	}

	onStart(): void {
		const map = store.getState(getMap);
		const path = map.path;

		task.wait(5);

		for (let i = 0; i < 100_000; i++) {
			task.wait(1);

			const ninja = createEnemy("NINJA", path);
			this.addEnemy(ninja);
		}
	}

	onTick(): void {
		store.enemyTick();
	}
}
