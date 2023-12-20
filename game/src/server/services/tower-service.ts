import { OnStart, OnTick, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { Tower } from "shared/store/tower/tower-slice";
import { store } from "server/store";
import { getAttacks, getTowers } from "shared/store/tower";
import { getClosestEnemyIdToTower, getEnemyFromId } from "shared/store/enemy";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";
import { createBasicAttack } from "shared/modules/attack";
import { generateUniqueId } from "shared/modules/util/id";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/util/path-utils";

@Service({})
export class TowerService implements OnStart, OnTick {
	private addTower(tower: Tower) {
		const towerId = generateUniqueId();

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

	onTick(): void {
		const towers = store.getState(getTowers);

		for (const [id, tower] of pairs(towers)) {
			const nextAttackTimestamp = tower.spawnTimestamp + tower.attackIntervalTimestamp * tower.attackCount;
			const now = getCurrentTimeInMilliseconds();
			if (now < nextAttackTimestamp) continue;

			const possibleClosestEnemyIdToTower = store.getState(getClosestEnemyIdToTower(tower));
			if (!possibleClosestEnemyIdToTower.exists) continue;

			const closestEnemyIdToTower = possibleClosestEnemyIdToTower.value;

			const possibleClosestEnemy = store.getState(getEnemyFromId(closestEnemyIdToTower));
			if (!possibleClosestEnemy.exists) continue;

			const closestEnemy = possibleClosestEnemy.value;
			const closestEnemyCFrame = getCFrameFromPathCompletionAlpha(
				closestEnemy.path,
				closestEnemy.pathCompletionAlpha,
			);
			const closestEnemyPosition = closestEnemyCFrame.Position;

			const attackId = generateUniqueId();
			const attack = createBasicAttack(closestEnemyIdToTower, closestEnemyPosition, id, tower.attackDamage);

			store.addAttack(attackId, attack);
			store.incrementTowerAttackCount(id);
		}
	}
}
