import React from "@rbxts/react";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./tower/tower-loadout";
import { TowerPlacementMessage } from "./tower/tower-placement-message";
import { MatchInfo } from "./game/match-info";
import { TowerActionMenu } from "./tower/tower-action-menu";
import { Music } from "./music/music";
import { Dialog } from "./game/dialog";
import { EnemyTooltipBillboard } from "./enemy/enemy-tooltip";
import { RangeIndicator } from "./tower/range-part";
import { Objectives } from "./game/objectives";
import { EnemyDamageIndicators } from "./enemy/enemy-damage-indicators";

export function App() {
	return (
		<>
			<Music />
			<Panel key="app">
				<TowerLoadout key="tower-loadout" />

				<TowerPlacementMessage key="tower-placement-message" />

				<TowerActionMenu key="tower-action-menu" />
				<RangeIndicator key="range-part" />

				<EnemyTooltipBillboard key="enemy-tooltip" />
				<EnemyDamageIndicators />

				<Dialog />
				<MatchInfo key="match-info" />
				<Objectives />
			</Panel>
		</>
	);
}
