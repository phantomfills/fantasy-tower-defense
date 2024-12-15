import { OnStart, OnTick, Service } from "@flamework/core";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";
import { producer } from "server/store";
import {
	selectDoesTowerObstructionBoxCollideWithAnother,
	selectPossibleTowerFromId,
	selectTowers,
} from "shared/store/tower";
import { createId } from "shared/modules/utils/id-utils";
import {
	describeTowerFromType,
	getSellPriceForTower,
	getTowerMaxLevelFromType,
	getTowerObstructionRadius,
} from "shared/modules/tower/tower-type-to-tower-stats-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { selectMoney } from "shared/store/money";
import { SELLBACK_RATE } from "shared/modules/money/sellback-rate";
import { selectPlayersCanPlaceTowers, selectPlayersCanUpgradeTowers } from "shared/store/level";
import { calculateEffectiveTowerDamageIfEnemyIsReinforced, E_Trait } from "shared/modules/attack/trait";
import { LevelService } from "./level-service";
import { world } from "server/world";
import { enemyComponent } from "shared/components/enemy";
import { healthComponent, pathFollowerComponent, traitsComponent } from "shared/components/util";

const MILLISECONDS_IN_SECOND = 1000;
const HEAL_TICK = 2000;
const HEAL_RATE_PER_TICK = 0.01;

const userHasMoney = (userId: string, amount: number): boolean => {
	const possibleUserMoney = producer.getState(selectMoney(userId));
	if (!possibleUserMoney.exists) return false;

	const userMoney = possibleUserMoney.value;
	return userMoney >= amount;
};

const deductMoneyFromUser = (userId: string, amount: number) => {
	producer.removeMoney(userId, amount);
};

const sellTower = (id: string) => {
	const possibleTower = producer.getState(selectPossibleTowerFromId(id));
	if (!possibleTower.exists) return;

	const tower = possibleTower.value;
	const sellPrice = getSellPriceForTower(tower.towerType, tower.level, SELLBACK_RATE);

	const owner = tower.owner;
	producer.addMoney(owner, sellPrice);

	producer.destroyTower(id);
};

@Service({})
export class TowerService implements OnStart, OnTick {
	constructor(private levelService: LevelService) {}

	onStart() {
		Events.placeTower.connect((player, _type, cframe) => {
			const playersCanPlaceTowers = producer.getState(selectPlayersCanPlaceTowers);
			if (!playersCanPlaceTowers) return;

			const isValidPlacementPosition = this.levelService.isValidPlacementPosition(cframe.Position);
			if (!isValidPlacementPosition) return;

			const doesTowerObstructionBoxCollideWithAnother = producer.getState(
				selectDoesTowerObstructionBoxCollideWithAnother(cframe.Position, getTowerObstructionRadius(_type)),
			);
			if (doesTowerObstructionBoxCollideWithAnother) return;

			const userId = tostring(player.UserId);

			const tower = createTower(_type, cframe, 0, userId, getCurrentTimeInMilliseconds());
			const towerId = createId();

			const towerPlacementCost = describeTowerFromType(_type, 0).cost;
			if (!userHasMoney(userId, towerPlacementCost)) return;
			deductMoneyFromUser(tostring(userId), towerPlacementCost);

			producer.addTower(towerId, tower);
		});

		Events.upgradeTower.connect((player, id) => {
			const playersCanUpgradeTowers = producer.getState(selectPlayersCanUpgradeTowers);
			if (!playersCanUpgradeTowers) return;

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

		for (const [id, { lastAttackTimestamp, lastHealTimestamp, towerType, level, health, cframe }] of pairs(
			towers,
		)) {
			if (health <= 0) {
				sellTower(id);
				continue;
			}

			const { cooldown, damage, traits, maxHealth, range } = describeTowerFromType(towerType, level);
			const cooldownMilliseconds = cooldown * MILLISECONDS_IN_SECOND;

			const currentTimestamp = getCurrentTimeInMilliseconds();
			if (currentTimestamp - lastHealTimestamp > HEAL_TICK && health < maxHealth) {
				const healAmount = math.min(maxHealth * HEAL_RATE_PER_TICK, maxHealth - health);
				producer.healTower(id, healAmount);
				producer.setLastHealTimestamp(id, currentTimestamp);
			}

			if (currentTimestamp - lastAttackTimestamp < cooldownMilliseconds) continue;

			const enemiesInRange = [];

			for (const [id, enemy, pathFollower, health, traits] of world.query(
				enemyComponent,
				pathFollowerComponent,
				healthComponent,
				traitsComponent,
			)) {
				const enemyX = pathFollower.cframe.X;
				const enemyZ = pathFollower.cframe.Z;
				const enemyPosition = new Vector2(enemyX, enemyZ);

				const towerX = cframe.X;
				const towerZ = cframe.Z;
				const towerPosition = new Vector2(towerX, towerZ);

				const distance = enemyPosition.sub(towerPosition).Magnitude;
				if (distance > range) continue;

				enemiesInRange.push({
					id,
					enemy,
					pathFollower,
					health,
					traits,
				});
			}

			if (enemiesInRange.isEmpty()) continue;

			const enemiesSortedByPathProgression = enemiesInRange.sort((entityA, entityB) => {
				return entityA.pathFollower.progressionAlpha > entityB.pathFollower.progressionAlpha;
			});

			const firstEnemy = enemiesSortedByPathProgression[0];

			const firstEnemyId = firstEnemy.id;
			const firstEnemyPathFollower = firstEnemy.pathFollower;
			const firstEnemyHealth = firstEnemy.health;
			const firstEnemyTraits = firstEnemy.traits.traits;

			const effectiveDamage = calculateEffectiveTowerDamageIfEnemyIsReinforced(damage, firstEnemyTraits, traits);
			world.insert(
				firstEnemyId,
				firstEnemyHealth.patch({
					value: math.max(firstEnemyHealth.value - effectiveDamage, 0),
				}),
			);

			Events.towerAttack.broadcast(id, firstEnemyPathFollower.cframe.Position);

			producer.setLastAttackTimestamp(id, currentTimestamp);
		}
	}
}
