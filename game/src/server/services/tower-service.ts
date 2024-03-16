import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { producer } from "server/store";
import { getPossibleTowerFromId, getTowers, towerDoesNotExistFromId } from "shared/store/tower";
import { getClosestEnemyIdToTower, getEnemyCFrameFromId, getEnemyIdsInTowerRange } from "shared/store/enemy";
import { createId } from "shared/modules/utils/id-utils";
import { Attack, createBasicAttack } from "shared/modules/attack";
import {
	describeTowerFromType,
	getSellPriceForTower,
	getTowerMaxLevelFromType,
} from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import Object from "@rbxts/object-utils";
import { getMoney } from "shared/store/money";
import { SELLBACK_RATE } from "shared/modules/money/sellback-rate";

const MILLISECONDS_IN_SECOND = 1000;

function towerAdded(id: string): void {
	let lastAttackTimestamp = getCurrentTimeInMilliseconds();

	const stopCheckingForEnemiesInTowerRange = producer.subscribe(getEnemyIdsInTowerRange(id), (enemies) => {
		if (enemies.isEmpty()) return;

		const possibleTower = producer.getState(getPossibleTowerFromId(id));
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

		const attack = createBasicAttack(closestEnemyId, enemyPosition, id, damage);
		producer.addAttack(attackId, attack);
	});

	producer.once(towerDoesNotExistFromId(id), stopCheckingForEnemiesInTowerRange);
}

function userHasMoney(userId: string, amount: number): boolean {
	const possibleUserMoney = producer.getState(getMoney(userId));
	if (!possibleUserMoney.exists) return false;

	const userMoney = possibleUserMoney.value;
	return userMoney >= amount;
}

function deductMoneyFromUser(userId: string, amount: number): void {
	producer.removeMoney(userId, amount);
}

function sellTower(id: string): void {
	const possibleTower = producer.getState(getPossibleTowerFromId(id));
	if (!possibleTower.exists) return;

	const tower = possibleTower.value;
	const sellPrice = getSellPriceForTower(tower.towerType, tower.level, SELLBACK_RATE);

	const owner = tower.owner;
	producer.addMoney(owner, sellPrice);

	producer.destroyTower(id);
}

@Service({})
export class TowerService implements OnStart {
	onStart(): void {
		Events.placeTower.connect((player, _type, cframe) => {
			const userId = tostring(player.UserId);

			const tower = createTower(_type, cframe, 0, userId);
			const towerId = createId();

			const towerPlacementCost = describeTowerFromType(_type, 0).cost;
			if (!userHasMoney(userId, towerPlacementCost)) return;
			deductMoneyFromUser(tostring(userId), towerPlacementCost);

			producer.addTower(towerId, tower);
		});

		Events.upgradeTower.connect((player, id) => {
			const userId = tostring(player.UserId);

			const possibleTower = producer.getState(getPossibleTowerFromId(id));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			const { owner, towerType } = tower;
			if (owner !== userId) return;

			const maxLevel = getTowerMaxLevelFromType(towerType);
			if (tower.level >= maxLevel) return;

			const upgradeCost = describeTowerFromType(towerType, tower.level + 1).cost;
			if (!userHasMoney(userId, upgradeCost)) return;
			deductMoneyFromUser(userId, upgradeCost);

			producer.upgradeTower(id);
		});

		Events.sellTower.connect((player, id) => {
			const possibleTower = producer.getState(getPossibleTowerFromId(id));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			if (tower.owner !== tostring(player.UserId)) return;

			sellTower(id);
		});

		producer.subscribe(getTowers, (towers, lastTowers) => {
			for (const [id, _] of pairs(towers)) {
				if (Object.keys(lastTowers).includes(id)) continue;
				towerAdded(id);
			}
		});
	}
}
