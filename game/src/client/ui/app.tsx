import React from "@rbxts/react";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./tower/tower-loadout";
import { LifeCounter } from "./game/life-counter";
import { FollowMouse } from "./utils/follow-mouse";
import { TowerPlacementMessage } from "./tower/tower-placement-message";
import { useSelector } from "@rbxts/react-reflex";
import { selectPossibleTowerPlacement, selectTowerLoadout } from "client/store/tower-loadout";
import { TowerSlot } from "./tower/tower-slot";
import { MatchInfo } from "./game/match-info";
import { CashCounter } from "./game/cash-counter";
import { selectFocusEnemyId } from "client/store/enemy-focus";
import { EnemyTooltipFromId } from "./enemy/enemy-tooltip-from-id";
import { selectPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { TowerActionMenuFromId } from "./tower/tower-action-menu-from-id";
import { Events } from "client/network";
import { selectMoney } from "shared/store/money";
import { Players, Workspace } from "@rbxts/services";
import { getEnemyDamageIndicators } from "client/store/enemy-damage-indicator";
import Object from "@rbxts/object-utils";
import { EnemyDamageIndicator } from "./enemy/enemy-damage-indicator";
import { producer } from "client/store";
import { Music } from "./music/music";
import {
	selectDialogComplete,
	selectDialogText,
	selectNumberOfPlayersWhoCompletedDialog,
	selectPlayersCanPlaceTower,
	selectPlayersCanUpgradeTower,
	selectTotalNumberOfPlayersWhoMustCompleteDialog,
} from "shared/store/dialog";
import { Dialog } from "./game/dialog";
import { selectEnemyDetailViewType } from "client/store/settings";
import { EnemyTooltipBillboardFromId } from "./enemy/enemy-tooltip";
import { selectLives } from "shared/store/map";
import { createPortal } from "@rbxts/react-roblox";
import { RangePartFromId } from "./tower/range-part";
import { Objectives } from "./game/objectives";

export function App() {
	const towers = useSelector(selectTowerLoadout);
	const possibleEnemyFocusId = useSelector(selectFocusEnemyId);
	const possibleTowerFocusId = useSelector(selectPossibleTowerId);
	const enemyDamageIndicators = useSelector(getEnemyDamageIndicators);
	const money = useSelector(selectMoney(tostring(Players.LocalPlayer.UserId)));
	const dialog = useSelector(selectDialogText);
	const enemyDetailViewType = useSelector(selectEnemyDetailViewType);
	const lives = useSelector(selectLives);
	const dialogComplete = useSelector(selectDialogComplete);
	const numberOfPlayersWhoCompletedDialog = useSelector(selectNumberOfPlayersWhoCompletedDialog);
	const totalNumberOfPlayersWhoMustCompleteDialog = useSelector(selectTotalNumberOfPlayersWhoMustCompleteDialog);
	const playersCanPlaceTower = useSelector(selectPlayersCanPlaceTower);
	const playersCanUpgradeTower = useSelector(selectPlayersCanUpgradeTower);
	const possibleTowerPlacement = useSelector(selectPossibleTowerPlacement);

	return (
		<>
			<Music />
			<Panel key="app">
				{playersCanPlaceTower && (
					<TowerLoadout key="tower-loadout">
						{towers.map((tower, index) => (
							<TowerSlot
								number={tower.number}
								icon={tower.icon}
								cost={tower.cost}
								callback={tower.callback}
								key={`tower-slot-${index}`}
							/>
						))}
					</TowerLoadout>
				)}

				{possibleEnemyFocusId.exists &&
					(enemyDetailViewType === "HOVER" ? (
						<EnemyTooltipFromId id={possibleEnemyFocusId.value} key="enemy-tooltip" />
					) : (
						enemyDetailViewType === "CLOSEST" && (
							<EnemyTooltipBillboardFromId id={possibleEnemyFocusId.value} key="enemy-tooltip" />
						)
					))}

				{playersCanUpgradeTower && possibleTowerFocusId.exists && (
					<>
						{createPortal(
							<RangePartFromId towerId={possibleTowerFocusId.value} />,
							Workspace.CurrentCamera ? Workspace.CurrentCamera : Workspace,
							"range-part",
						)}
						<TowerActionMenuFromId
							towerId={possibleTowerFocusId.value}
							actions={{
								upgrade: () => {
									Events.upgradeTower.fire(possibleTowerFocusId.value);
								},
								sell: () => {
									Events.sellTower.fire(possibleTowerFocusId.value);
								},
							}}
							close={() => {
								producer.clearTowerId();
							}}
							key="tower-action-menu"
						/>
					</>
				)}

				{possibleTowerPlacement.exists && <TowerPlacementMessage />}

				{Object.values(enemyDamageIndicators).map(({ damage, position, spawnTime }, index) => (
					<EnemyDamageIndicator
						key={`enemy-damage-indicator-${index}`}
						damage={damage}
						position={position}
						spawnTime={spawnTime}
					/>
				))}

				<Dialog
					visible={!dialogComplete}
					text={dialog.exists ? dialog.value : ""}
					totalTicksRequired={totalNumberOfPlayersWhoMustCompleteDialog}
					numberTicked={numberOfPlayersWhoCompletedDialog}
					onTick={() => Events.completeDialog.fire()}
					key="dialog"
				/>

				<MatchInfo key="match-info">
					<LifeCounter lives={lives} key="life-counter" />
					<CashCounter value={money.exists ? money.value : 0} key="money-counter" />
				</MatchInfo>

				<Objectives />
			</Panel>
		</>
	);
}
