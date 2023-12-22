import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { Tower, towerSlice } from "shared/store/tower/tower-slice";
import { store } from "server/store";
import { getAttacks, getTowers } from "shared/store/tower";
import { getClosestEnemyIdToTower, getEnemyFromId, getEnemyIdsInTowerRange } from "shared/store/enemy";
import { createBasicAttack } from "shared/modules/attack";
import { generateUniqueId } from "shared/modules/util/id";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/util/path-utils";
import { setInterval } from "@rbxts/set-timeout";
import { Possible, possible } from "shared/modules/util/possible";
import Object from "@rbxts/object-utils";

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
			for (const [id, tower] of pairs(towers)) {
				if (Object.keys(lastTowers).includes(id)) continue;

				let possibleStopTowerAttacks: Possible<() => void> = { exists: false };

				const stopCheckingForEnemiesInTowerRange = store.subscribe(
					getEnemyIdsInTowerRange(tower),
					(enemies) => {
						if (enemies.size() === 0) {
							if (possibleStopTowerAttacks.exists) possibleStopTowerAttacks.value();
							possibleStopTowerAttacks = {
								exists: false,
							};
							return;
						}

						if (possibleStopTowerAttacks.exists) return;

						print("I got to this point!!!");

						setInterval(() => {
							print("interval");

							const possibleClosestEnemyToTower = store.getState(getClosestEnemyIdToTower(tower));
							if (!possibleClosestEnemyToTower.exists) return;

							const [closestEnemyIdToTower] = possibleClosestEnemyToTower.value;
							const possibleClosestEnemy = store.getState(getEnemyFromId(closestEnemyIdToTower));
							if (!possibleClosestEnemy.exists) return;

							const closestEnemy = possibleClosestEnemy.value;
							const closestEnemyCFrame = getCFrameFromPathCompletionAlpha(
								closestEnemy.path,
								closestEnemy.pathCompletionAlpha,
							);
							const closestEnemyPosition = closestEnemyCFrame.Position;

							const attackId = generateUniqueId();
							const attack = createBasicAttack(
								closestEnemyIdToTower,
								closestEnemyPosition,
								id,
								tower.attackDamage,
							);

							store.addAttack(attackId, attack);
						}, tower.attackIntervalTimestamp / 1000);

						/*possibleStopTowerAttacks = {
							exists: true,
							value: setInterval(() => {
								print("interval");

								const possibleClosestEnemyToTower = store.getState(getClosestEnemyIdToTower(tower));
								if (!possibleClosestEnemyToTower.exists) return;

								const [closestEnemyIdToTower] = possibleClosestEnemyToTower.value;
								const possibleClosestEnemy = store.getState(getEnemyFromId(closestEnemyIdToTower));
								if (!possibleClosestEnemy.exists) return;

								const closestEnemy = possibleClosestEnemy.value;
								const closestEnemyCFrame = getCFrameFromPathCompletionAlpha(
									closestEnemy.path,
									closestEnemy.pathCompletionAlpha,
								);
								const closestEnemyPosition = closestEnemyCFrame.Position;

								const attackId = generateUniqueId();
								const attack = createBasicAttack(
									closestEnemyIdToTower,
									closestEnemyPosition,
									id,
									tower.attackDamage,
								);

								store.addAttack(attackId, attack);
							}, tower.attackIntervalTimestamp / 1000),
						}; */
					},
				);

				return stopCheckingForEnemiesInTowerRange;
			}
		});

		// store.observe(getTowers, (tower, id) => {
		// 	let possibleStopTowerAttacks: Possible<() => void> = { exists: false };

		// 	const stopCheckingForEnemiesInTowerRange = store.subscribe(getEnemyIdsInTowerRange(tower), (enemies) => {
		// 		if (enemies.size() === 0) {
		// 			if (possibleStopTowerAttacks.exists) possibleStopTowerAttacks.value();
		// 			return;
		// 		}

		// 		possibleStopTowerAttacks = {
		// 			exists: true,
		// 			value: setInterval(() => {
		// 				const possibleClosestEnemyToTower = store.getState(getClosestEnemyIdToTower(tower));
		// 				if (!possibleClosestEnemyToTower.exists) return;

		// 				const [closestEnemyIdToTower] = possibleClosestEnemyToTower.value;
		// 				const possibleClosestEnemy = store.getState(getEnemyFromId(closestEnemyIdToTower));
		// 				if (!possibleClosestEnemy.exists) return;

		// 				const closestEnemy = possibleClosestEnemy.value;
		// 				const closestEnemyCFrame = getCFrameFromPathCompletionAlpha(
		// 					closestEnemy.path,
		// 					closestEnemy.pathCompletionAlpha,
		// 				);
		// 				const closestEnemyPosition = closestEnemyCFrame.Position;

		// 				const attackId = generateUniqueId();
		// 				const attack = createBasicAttack(
		// 					closestEnemyIdToTower,
		// 					closestEnemyPosition,
		// 					id,
		// 					tower.attackDamage,
		// 				);
		// 				store.addAttack(attackId, attack);
		// 			}, tower.attackIntervalTimestamp / 1000),
		// 		};
		// 	});

		// 	return stopCheckingForEnemiesInTowerRange();
		// });
	}
}
