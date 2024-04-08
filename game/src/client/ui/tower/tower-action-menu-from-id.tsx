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
import { TowerActionMenu } from "./tower-action-menu";
import { Players } from "@rbxts/services";
import { selectPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { producer } from "client/store";
import { Events } from "client/network";
import { selectPlayersCanUpgradeTower } from "shared/store/dialog";

const player = Players.LocalPlayer;
const userId = tostring(player.UserId);

export function TowerActionMenuFromId() {
	const possibleMoney = useSelector(selectMoney(userId));
	const possibleTowerFocusId = useSelector(selectPossibleTowerId);
	const playersCanUpgradeTower = useSelector(selectPlayersCanUpgradeTower);
	if (!possibleMoney.exists || !possibleTowerFocusId.exists || !playersCanUpgradeTower) return <></>;

	const money = possibleMoney.value;
	const towerId = possibleTowerFocusId.value;

	const possibleTower = producer.getState(selectPossibleTowerFromId(towerId));
	if (!possibleTower.exists) return <></>;

	const tower = possibleTower.value;
	const { towerType, level } = tower;
	const towerDisplayName = getTowerDisplayNameFromType(towerType);

	const towerUpgradeCost = getTowerUpgradeCost(towerType, level + 1);
	const towerUpgradeCostMessage = towerUpgradeCost !== undefined ? `Upgrade: $${towerUpgradeCost}` : "Maxed baby!";

	const towerSellPrice = getSellPriceForTower(towerType, level, SELLBACK_RATE);

	const upgradeTitle = getUpgradeTitle(towerType, level + 1);
	const upgradeDescription = getUpgradeDescription(towerType, level + 1);
	const upgradeCost = getUpgradeCost(towerType, level + 1);

	const stats = describeTowerFromType(towerType, level);
	const traits = stats.traits;

	return (
		<TowerActionMenu
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
		/>
	);
}
