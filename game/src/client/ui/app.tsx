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
import { Frame } from "./utils/frame";

export function App() {
	return (
		<>
			<Music />
			<Panel>
				<Frame size={new UDim2(1, -10, 1, -10)} position={new UDim2(0, 5, 0, 5)}>
					<TowerLoadout />

					<TowerPlacementMessage />

					<TowerActionMenu />
					<RangeIndicator />

					<EnemyTooltipBillboard />
					<EnemyDamageIndicators />

					<Dialog />
					<MatchInfo />
					<Objectives />
				</Frame>
			</Panel>
		</>
	);
}
