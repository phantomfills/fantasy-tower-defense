import Roact from "@rbxts/roact";
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
import { getHoveringEnemyId } from "client/store/enemy-hover";
import { EnemyTooltipFromId } from "./enemy/enemy-tooltip-from-id";
import { getPossibleTowerId } from "client/store/tower-action-menu-slice/tower-action-selectors";
import { TowerActionMenu } from "./tower/tower-action-menu";
import { Events } from "client/network";
import { getMoney } from "shared/store/money";
import { Players } from "@rbxts/services";
import { producer } from "client/store";

export function App() {
	const towers = useSelector(getTowerLoadout);
	const possibleTowerPlacement = useSelector(getPossibleTowerPlacement);
	const possibleHoveringEnemyId = useSelector(getHoveringEnemyId);
	const possibleTowerFocusId = useSelector(getPossibleTowerId);
	const money = useSelector(getMoney(tostring(Players.LocalPlayer.UserId)));

	return (
		<Panel>
			<TowerLoadout>
				{towers.map((tower, index) => (
					<TowerSlot
						number={tower.number}
						icon={tower.icon}
						cost={tower.cost}
						callback={tower.callback}
						key={index}
					/>
				))}
			</TowerLoadout>

			{possibleTowerPlacement.exists && (
				<FollowMouse size={new UDim2(0.075, 0, 0.04, 0)} zIndex={5}>
					<TowerPlacementMessage />
				</FollowMouse>
			)}

			{possibleHoveringEnemyId.exists && <EnemyTooltipFromId id={possibleHoveringEnemyId.value} />}

			{possibleTowerFocusId.exists && (
				<TowerActionMenu
					towerId={possibleTowerFocusId.value}
					actions={{
						upgrade: () => {
							Events.upgradeTower.fire(possibleTowerFocusId.value);
						},
						sell: () => {
							producer.clearTowerId();
							Events.sellTower.fire(possibleTowerFocusId.value);
						},
					}}
				/>
			)}

			<MatchInfo>
				<LifeCounter lives={1000} />
				<CashCounter value={money.exists ? money.value : 0} />
			</MatchInfo>
		</Panel>
	);
}
