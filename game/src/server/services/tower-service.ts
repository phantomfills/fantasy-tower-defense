import { OnStart, OnTick, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { producer } from "server/store";
import { selectPossibleTowerFromId, selectTowers } from "shared/store/tower";
import { selectEnemies, selectEnemyCFrameFromId, selectFirstAttackableEnemyInTowerRange } from "shared/store/enemy";
import { createId } from "shared/modules/utils/id-utils";
import { createBasicTowerAttack } from "shared/modules/attack";
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
import { attackEnemy } from "server/events";
import { selectIsValidPlacementPosition } from "shared/store/map";
import { selectPlayersCanPlaceTower, selectPlayersCanUpgradeTower } from "shared/store/dialog";
import { calculateEffectiveTowerDamageIfEnemyIsReinforced } from "shared/modules/attack/trait";

const MILLISECONDS_IN_SECOND = 1000;
const HEAL_TICK = 2000;
const HEAL_RATE_PER_TICK = 0.01;

function userHasMoney(userId: string, amount: number): boolean {
	const possibleUserMoney = producer.getState(selectMoney(userId));
	if (!possibleUserMoney.exists) return false;

	const userMoney = possibleUserMoney.value;
	return userMoney >= amount;
}

function deductMoneyFromUser(userId: string, amount: number) {
	producer.removeMoney(userId, amount);
}

function sellTower(id: string) {
	const possibleTower = producer.getState(selectPossibleTowerFromId(id));
	if (!possibleTower.exists) return;

	const tower = possibleTower.value;
	const sellPrice = getSellPriceForTower(tower.towerType, tower.level, SELLBACK_RATE);

	const owner = tower.owner;
	producer.addMoney(owner, sellPrice);

	producer.destroyTower(id);
}

@Service({})
export class TowerService implements OnStart, OnTick {
	onStart() {
		Events.placeTower.connect((player, _type, cframe) => {
			const playersCanPlaceTower = producer.getState(selectPlayersCanPlaceTower);
			if (!playersCanPlaceTower) return;

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
			const playersCanUpgradeTower = producer.getState(selectPlayersCanUpgradeTower);
			if (!playersCanUpgradeTower) return;

			const userId = tostring(player.UserId);

			const possibleTower = producer.getState(selectPossibleTowerFromId(id));
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
			const possibleTower = producer.getState(selectPossibleTowerFromId(id));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			if (tower.owner !== tostring(player.UserId)) return;

			sellTower(id);
		});
	}

	onTick() {
		const towers = producer.getState(selectTowers);

		for (const [id, { lastAttackTimestamp, lastHealTimestamp, towerType, level, health }] of pairs(towers)) {
			if (health <= 0) {
				sellTower(id);
				continue;
			}

			const { cooldown, damage, traits, maxHealth } = describeTowerFromType(towerType, level);
			const cooldownMilliseconds = cooldown * MILLISECONDS_IN_SECOND;

			const currentTimestamp = getCurrentTimeInMilliseconds();
			if (currentTimestamp - lastHealTimestamp > HEAL_TICK && health < maxHealth) {
				const healAmount = math.min(maxHealth * HEAL_RATE_PER_TICK, maxHealth - health);
				producer.healTower(id, healAmount);
				producer.setLastHealTimestamp(id, currentTimestamp);
			}

			if (currentTimestamp - lastAttackTimestamp < cooldownMilliseconds) continue;

			const enemies = producer.getState(selectEnemies);
			if (Object.keys(enemies).isEmpty()) continue;

			const possibleFirstEnemyInRangeId = producer.getState(
				selectFirstAttackableEnemyInTowerRange(id, getCurrentTimeInMilliseconds()),
			);
			if (!possibleFirstEnemyInRangeId.exists) continue;

			const [firstEnemyInRangeId, firstEnemyInRange] = possibleFirstEnemyInRangeId.value;

			const enemyTraits = describeEnemyFromType(firstEnemyInRange.enemyType).traits;

			const effectiveDamage = calculateEffectiveTowerDamageIfEnemyIsReinforced(damage, enemyTraits, traits);

			const possibleEnemyCFrame = producer.getState(
				selectEnemyCFrameFromId(firstEnemyInRangeId, getCurrentTimeInMilliseconds()),
			);
			if (!possibleEnemyCFrame.exists) continue;

			producer.setLastAtackTimestamp(id, currentTimestamp);

			const enemyCFrame = possibleEnemyCFrame.value;
			const enemyPosition = enemyCFrame.Position;

			const attackId = createId();

			const attack = createBasicTowerAttack(
				attackId,
				firstEnemyInRangeId,
				enemyPosition,
				id,
				math.min(effectiveDamage, firstEnemyInRange.health),
			);
			attackEnemy.Fire(attack);
		}
	}
}
