import { OnStart, OnTick, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { Tower } from "shared/store/tower/tower-slice";
import { store } from "server/store";
import { HttpService } from "@rbxts/services";
import { getAttacks, getTowers } from "shared/store/tower";
import { getClosestEnemyIdToTower } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";

@Service({})
export class TowerService implements OnStart, OnTick {
	private addTower(tower: Tower) {
		const towerId = HttpService.GenerateGUID();

		store.addTower(towerId, tower);
	}

	onStart(): void {
		Events.placeTower.connect((_, towerType, cframe) => {
			const tower = createTower(towerType, cframe);
			this.addTower(tower);
		});

		store.observe(getAttacks, ({ enemyId, damage }) => {
			store.dealDamageToEnemy(enemyId, damage);
		});
	}

	onTick(dt: number): void {
		const towers = store.getState(getTowers);

		for (const [id, tower] of pairs(towers)) {
			const nextAttackTimestamp = tower.spawnTimestamp + tower.attackIntervalTimestamp * tower.attackCount;
			const now = getCurrentTimeInMilliseconds();
			if (now < nextAttackTimestamp) continue;

			const possibleClosestEnemyIdToTower = store.getState(getClosestEnemyIdToTower(tower));
			if (!possibleClosestEnemyIdToTower.exists) continue;

			const closestEnemyIdToTower = possibleClosestEnemyIdToTower.value;
			store.addAttack({ towerId: id, enemyId: closestEnemyIdToTower, damage: 10 });

			store.incrementTowerAttackCount(id);
		}
	}
}
