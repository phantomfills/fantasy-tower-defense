import React from "@rbxts/react";
import { getTowerDisplayNameFromType } from "shared/modules/tower/tower-type-to-display-name-map";
import { useSelector } from "@rbxts/react-reflex";
import { selectPossibleTowerFromId } from "shared/store/tower";
import {
	describeTowerFromType,
	getSellPriceForTower,
	getTowerUpgradeCost,
	getUpgradeCost,
	getUpgradeDescription,
	getUpgradeTitle,
} from "shared/modules/tower/tower-type-to-tower-stats-map";
import { SELLBACK_RATE } from "shared/modules/money/sellback-rate";
import { selectMoney } from "shared/store/money";
import { TowerActionMenuFrame } from "./tower-action-menu-frame";
import { Players } from "@rbxts/services";
import { selectPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { producer } from "client/store";
import { Events } from "client/network";
import { selectPlayersCanUpgradeTowers } from "shared/store/level";
import { getFormattedValue } from "shared/modules/utils/get-formatted-value";

const player = Players.LocalPlayer;
const userId = tostring(player.UserId);

export function TowerActionMenu() {
	const possibleMoney = useSelector(selectMoney(userId));
	const possibleTowerFocusId = useSelector(selectPossibleTowerId);
	const playersCanUpgradeTowers = useSelector(selectPlayersCanUpgradeTowers);
	if (!possibleMoney.exists || !possibleTowerFocusId.exists || !playersCanUpgradeTowers) return <></>;

	const money = possibleMoney.value;
	const towerId = possibleTowerFocusId.value;

	const possibleTower = producer.getState(selectPossibleTowerFromId(towerId));
	if (!possibleTower.exists) return <></>;

	const tower = possibleTower.value;
	const { towerType, level, health } = tower;
	const towerDisplayName = getTowerDisplayNameFromType(towerType);

	const towerUpgradeCost = getTowerUpgradeCost(towerType, level + 1);
	const towerUpgradeCostMessage = towerUpgradeCost !== undefined ? `Upgrade: $${towerUpgradeCost}` : "Maxed baby!";

	const towerSellPrice = getSellPriceForTower(towerType, level, SELLBACK_RATE);

	const upgradeTitle = getUpgradeTitle(towerType, level + 1);
	const upgradeDescription = getUpgradeDescription(towerType, level + 1);
	const upgradeCost = getUpgradeCost(towerType, level + 1) ?? math.huge;

	const { maxHealth, traits } = describeTowerFromType(towerType, level);

	const formattedHealth = getFormattedValue(health);

	return (
		<TowerActionMenuFrame
			name={towerDisplayName}
			money={money}
			level={level}
			actions={{
				upgrade: {
					name: towerUpgradeCostMessage,
					call: () => {
						Events.upgradeTower.fire(towerId);
					},
				},
				sell: {
					name: `Sell: $${towerSellPrice}`,
					call: () => {
						Events.sellTower.fire(towerId);
					},
				},
			}}
			close={() => {
				producer.clearTowerId();
			}}
			upgradeTitle={upgradeTitle !== undefined ? `Lv. ${level + 1} - ${upgradeTitle}` : "YOU MAXED THIS TOWER!"}
			upgradeDescription={upgradeDescription ?? "INFINITE POWER!"}
			upgradeCost={upgradeCost}
			traits={traits}
			health={formattedHealth}
			maxHealth={maxHealth}
		/>
	);
}
