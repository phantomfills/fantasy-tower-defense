import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { Tower } from "shared/store/tower/tower-slice";
import { producer } from "server/store";
import { getAttacks, getTowerFromId, getTowers, towerDoesNotExistFromId } from "shared/store/tower";
import { getClosestEnemyIdToTower, getEnemyCFrameFromId, getEnemyIdsInTowerRange } from "shared/store/enemy";
import { createId } from "shared/modules/utils/id-utils";
import { Attack } from "shared/modules/attack";
import { describeTowerFromType, getTowerMaxLevelFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import Object from "@rbxts/object-utils";

const MILLISECONDS_IN_SECOND = 1000;

function towerAdded(id: string): void {
	let lastAttackTimestamp = getCurrentTimeInMilliseconds();

	const stopCheckingForEnemiesInTowerRange = producer.subscribe(getEnemyIdsInTowerRange(id), (enemies) => {
		if (enemies.isEmpty()) return;

		const possibleTower = producer.getState(getTowerFromId(id));
		if (!possibleTower.exists) return;

		const tower = possibleTower.value;

		const { towerType, level } = tower;
		const { cooldown, damage } = describeTowerFromType(towerType, level);

		const currentTimestamp = getCurrentTimeInMilliseconds();
		if (currentTimestamp - lastAttackTimestamp < cooldown * MILLISECONDS_IN_SECOND) return;

		lastAttackTimestamp = currentTimestamp;

		const possibleClosestEnemyId = producer.getState(getClosestEnemyIdToTower(tower));
		if (!possibleClosestEnemyId.exists) return;

		const [closestEnemyId] = possibleClosestEnemyId.value;

		const possibleEnemyCFrame = producer.getState(getEnemyCFrameFromId(closestEnemyId));
		if (!possibleEnemyCFrame.exists) return;

		const enemyCFrame = possibleEnemyCFrame.value;
		const enemyPosition = enemyCFrame.Position;

		const attackId = createId();
		const attack: Attack = {
			towerId: id,
			enemyId: closestEnemyId,
			damage: damage,
			enemyPosition,
		};

		producer.addAttack(attackId, attack);
	});

	producer.once(towerDoesNotExistFromId(id), stopCheckingForEnemiesInTowerRange);
}

@Service({})
export class TowerService implements OnStart {
	onStart(): void {
		Events.placeTower.connect((player, _type, cframe) => {
			const userId = player.UserId;

			const tower = createTower(_type, cframe, 0, userId);
			const towerId = createId();

			producer.addTower(towerId, tower);
		});

		Events.upgradeTower.connect((player, id) => {
			const possibleTower = producer.getState(getTowerFromId(id));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			const { owner, towerType } = tower;
			if (owner !== player.UserId) return;

			const maxLevel = getTowerMaxLevelFromType(towerType);
			if (tower.level >= maxLevel) return;

			producer.upgradeTower(id);
		});

		producer.observe(getAttacks, ({ enemyId, damage }) => {
			producer.dealDamageToEnemy(enemyId, damage);
		});

		producer.subscribe(getTowers, (towers, lastTowers) => {
			for (const [id, _] of pairs(towers)) {
				if (Object.keys(lastTowers).includes(id)) continue;
				towerAdded(id);
			}
		});
	}
}
