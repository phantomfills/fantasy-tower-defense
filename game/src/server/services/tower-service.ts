import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { Tower } from "shared/store/tower/tower-slice";
import { store } from "server/store";
import { getAttacks, getTowerFromId, getTowers, towerDoesNotExistFromId } from "shared/store/tower";
import { getClosestEnemyIdToTower, getEnemyCFrameFromId, getEnemyIdsInTowerRange } from "shared/store/enemy";
import { generateUniqueId } from "shared/modules/util/id";
import Object from "@rbxts/object-utils";
import { Attack } from "shared/modules/attack";
import { describeTower } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/util/get-time-in-ms";

function towerAdded(towerId: string) {
	const possibleTower = store.getState(getTowerFromId(towerId));
	if (!possibleTower.exists) return;

	const tower = possibleTower.value;
	const towerStats = describeTower(tower.type);

	let lastAttackTimestamp = getCurrentTimeInMilliseconds();

	const stopCheckingForEnemiesInTowerRange = store.subscribe(getEnemyIdsInTowerRange(tower), (enemies) => {
		if (enemies.isEmpty()) return;

		const currentTimestamp = getCurrentTimeInMilliseconds();
		if (currentTimestamp - lastAttackTimestamp < towerStats.firerate * 1000) return;

		lastAttackTimestamp = currentTimestamp;

		const possibleClosestEnemyId = store.getState(getClosestEnemyIdToTower(tower));
		if (!possibleClosestEnemyId.exists) return;

		const [closestEnemyId] = possibleClosestEnemyId.value;

		const possibleEnemyCFrame = store.getState(getEnemyCFrameFromId(closestEnemyId));
		if (!possibleEnemyCFrame.exists) return;

		const enemyCFrame = possibleEnemyCFrame.value;
		const enemyPosition = enemyCFrame.Position;

		const attackId = generateUniqueId();
		const attack: Attack = {
			towerId,
			enemyId: closestEnemyId,
			damage: towerStats.damage,
			enemyPosition,
		};

		store.addAttack(attackId, attack);
	});

	store.once(towerDoesNotExistFromId(towerId), stopCheckingForEnemiesInTowerRange);
}

@Service({})
export class TowerService implements OnStart {
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

		store.subscribe(getTowers, (towers, lastTowers) => {
			for (const [id, _] of pairs(towers)) {
				if (Object.keys(lastTowers).includes(id)) continue;
				towerAdded(id);
			}
		});
	}
}
