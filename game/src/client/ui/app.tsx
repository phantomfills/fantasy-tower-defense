import Roact, { useEffect } from "@rbxts/roact";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./tower/tower-loadout";
import { LifeCounter } from "./game/life-counter";
import { FollowMouse } from "./utils/follow-mouse";
import { TowerPlacementMessage } from "./tower/tower-placement-message";
import { useSelector } from "@rbxts/react-reflex";
import { getPossibleTowerPlacement, getTowerLoadout } from "client/store/tower-loadout";
import { TowerSlot } from "./tower/tower-slot";
import { MatchInfo } from "./game/match-info";
import { CashCounter } from "./game/cash-counter";
import { selectEnemyFocusDetails, selectFocusEnemyId } from "client/store/enemy-focus";
import { EnemyTooltipFromId } from "./enemy/enemy-tooltip-from-id";
import { getPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { TowerActionMenuFromId } from "./tower/tower-action-menu";
import { Events } from "client/network";
import { selectMoney } from "shared/store/money";
import { Players } from "@rbxts/services";
import { getEnemyDamageIndicators } from "client/store/enemy-damage-indicator";
import Object from "@rbxts/object-utils";
import { EnemyDamageIndicator } from "./enemy/enemy-damage-indicator";
import { producer } from "client/store";
import { Music } from "./music/music";
import { selectDialogText } from "shared/store/dialog";
import { Dialog } from "./game/dialog";
import { selectEnemyDetailViewType } from "client/store/settings";
import { EnemyTooltipBillboardFromId } from "./enemy/enemy-tooltip";
import { selectLives } from "shared/store/map";

export function App() {
	const towers = useSelector(getTowerLoadout);
	const possibleTowerPlacement = useSelector(getPossibleTowerPlacement);
	const possibleEnemyFocusId = useSelector(selectFocusEnemyId);
	const possibleTowerFocusId = useSelector(getPossibleTowerId);
	const enemyDamageIndicators = useSelector(getEnemyDamageIndicators);
	const money = useSelector(selectMoney(tostring(Players.LocalPlayer.UserId)));
	const dialog = useSelector(selectDialogText);
	const enemyDetailViewType = useSelector(selectEnemyDetailViewType);
	const lives = useSelector(selectLives);

	return (
		<>
			<Music />
			<Panel key="app">
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

				{possibleTowerPlacement.exists && (
					<FollowMouse size={new UDim2(0.075, 0, 0.04, 0)} zIndex={5} key="tower-placement-message-container">
						<TowerPlacementMessage key="tower-placement-message" />
					</FollowMouse>
				)}

				{possibleEnemyFocusId.exists ? (
					enemyDetailViewType === "HOVER" ? (
						<EnemyTooltipFromId id={possibleEnemyFocusId.value} key="enemy-tooltip" />
					) : (
						enemyDetailViewType === "CLOSEST" && (
							<EnemyTooltipBillboardFromId id={possibleEnemyFocusId.value} key="enemy-tooltip" />
						)
					)
				) : (
					<></>
				)}

				{possibleTowerFocusId.exists && (
					<TowerActionMenuFromId
						towerId={possibleTowerFocusId.value}
						actions={{
							upgrade: () => {
								Events.upgradeTower.fire(possibleTowerFocusId.value);
							},
							sell: () => {
								Events.sellTower.fire(possibleTowerFocusId.value);
								producer.clearTowerId();
							},
						}}
						close={() => {
							producer.clearTowerId();
						}}
						key="tower-action-menu"
					/>
				)}

				{Object.values(enemyDamageIndicators).map(({ damage, position, spawnTime }, index) => {
					return (
						<EnemyDamageIndicator
							key={`enemy-damage-indicator-${index}`}
							damage={damage}
							position={position}
							spawnTime={spawnTime}
						/>
					);
				})}

				{<Dialog visible={dialog.exists} text={dialog.exists ? dialog.value : ""} key="dialog" />}

				<MatchInfo key="match-info">
					<LifeCounter lives={lives} key="life-counter" />
					<CashCounter value={money.exists ? money.value : 0} key="money-counter" />
				</MatchInfo>
			</Panel>
		</>
	);
}
