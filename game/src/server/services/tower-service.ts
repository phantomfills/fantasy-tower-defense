import { OnStart, OnTick, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { producer } from "server/store";
import { getPossibleTowerFromId, selectTowers } from "shared/store/tower";
import { selectEnemies, selectEnemyCFrameFromId, selectFirstAttackableEnemyInTowerRange } from "shared/store/enemy";
import { createId } from "shared/modules/utils/id-utils";
import { createBasicAttack } from "shared/modules/attack";
import {
	describeTowerFromType,
	getSellPriceForTower,
	getTowerMaxLevelFromType,
} from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import Object from "@rbxts/object-utils";
import { selectMoney } from "shared/store/money";
import { SELLBACK_RATE } from "shared/modules/money/sellback-rate";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { towerAttack } from "server/events";
import { selectIsValidPlacementPosition } from "shared/store/map";

const MILLISECONDS_IN_SECOND = 1000;

function userHasMoney(userId: string, amount: number): boolean {
	const possibleUserMoney = producer.getState(selectMoney(userId));
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
export class TowerService implements OnStart, OnTick {
	onStart(): void {
		Events.placeTower.connect((player, _type, cframe) => {
			const isValidPlacementPosition = producer.getState(selectIsValidPlacementPosition(cframe.Position));
			if (!isValidPlacementPosition) return;

			const userId = tostring(player.UserId);

			const tower = createTower(_type, cframe, 0, userId, getCurrentTimeInMilliseconds());
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
	}

	onTick() {
		const towers = producer.getState(selectTowers);

		for (const [id, { lastAttackTimestamp, towerType, level }] of pairs(towers)) {
			const { cooldown, damage, traits } = describeTowerFromType(towerType, level);
			const cooldownMilliseconds = cooldown * MILLISECONDS_IN_SECOND;
			const currentTimestamp = getCurrentTimeInMilliseconds();
			if (currentTimestamp - lastAttackTimestamp < cooldownMilliseconds) continue;

			const enemies = producer.getState(selectEnemies);
			if (Object.keys(enemies).isEmpty()) continue;

			const possibleFirstEnemyInRangeId = producer.getState(selectFirstAttackableEnemyInTowerRange(id));
			if (!possibleFirstEnemyInRangeId.exists) continue;

			const [firstEnemyInRangeId, firstEnemyInRange] = possibleFirstEnemyInRangeId.value;

			const enemyTraits = describeEnemyFromType(firstEnemyInRange.enemyType).traits;

			const effectiveDamage = enemyTraits.includes("REINFORCED")
				? traits.includes("REINFORCED")
					? damage
					: 0
				: damage;

			const possibleEnemyCFrame = producer.getState(selectEnemyCFrameFromId(firstEnemyInRangeId));
			if (!possibleEnemyCFrame.exists) continue;

			producer.setLastAtackTimestamp(id, currentTimestamp);

			const enemyCFrame = possibleEnemyCFrame.value;
			const enemyPosition = enemyCFrame.Position;

			const attackId = createId();

			const attack = createBasicAttack(
				attackId,
				firstEnemyInRangeId,
				enemyPosition,
				id,
				math.min(effectiveDamage, firstEnemyInRange.health),
			);
			towerAttack.Fire(attack);
		}
	}
}
