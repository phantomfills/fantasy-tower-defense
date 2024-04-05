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

const player = Players.LocalPlayer;
const userId = tostring(player.UserId);

interface TowerActionMenuFromIdProps {
	actions: {
		upgrade: () => void;
		sell: () => void;
	};
	close: () => void;
	towerId: string;
}

export function TowerActionMenuFromId({ towerId, actions, close }: TowerActionMenuFromIdProps) {
	const possibleMoney = useSelector(selectMoney(userId));
	if (!possibleMoney.exists) return <></>;

	const possibleTower = useSelector(selectPossibleTowerFromId(towerId));
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
			money={possibleMoney.value}
			level={level}
			actions={{
				upgrade: {
					name: towerUpgradeCostMessage,
					call: actions.upgrade,
				},
				sell: {
					name: `Sell: $${towerSellPrice}`,
					call: actions.sell,
				},
			}}
			close={close}
			upgradeTitle={upgradeTitle !== undefined ? `Lv. ${level + 1} - ${upgradeTitle}` : "YOU MAXED THIS TOWER!"}
			upgradeDescription={upgradeDescription ?? "INFINITE POWER!"}
			upgradeCost={upgradeCost}
			traits={traits}
		/>
	);
}
