import { OnStart, OnTick, Service } from "@flamework/core";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { getMap } from "shared/store/map";
import { Enemy, getEnemies } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { getPossibleTowerFromId } from "shared/store/tower";
import { getAttacks } from "shared/store/attack";
import Object from "@rbxts/object-utils";

function addEnemyToStore(enemy: Enemy): void {
	producer.addEnemy(enemy, createId());
}

@Service({})
export class EnemyService implements OnStart, OnTick {
	onStart(): void {
		producer.observe(getAttacks, (attack) => {
			const { towerId, damage } = attack;

			const possibleTower = producer.getState(getPossibleTowerFromId(towerId));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			const { owner } = tower;

			producer.addMoney(owner, damage);
		});

		const map = producer.getState(getMap);
		const path = map.path;

		task.wait(5);

		for (let i = 0; i < 100_000; i++) {
			const enemy = createEnemy("STRONG_DUMMY", path);
			addEnemyToStore(enemy);

			task.wait(1);
		}
	}

	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());
	}
}
