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
import { Objectives, ObjectivesButton } from "./game/objectives";
import { DamageIndicators } from "./enemy/enemy-damage-indicators";
import { Frame } from "./utils/frame";
import { SettingsButton, SettingsMenu } from "./game/settings-menu";
import { Page } from "./utils/page";

export function App() {
	return (
		<>
			<Music />
			<Panel>
				<Frame size={new UDim2(1, -10, 1, -10)} position={new UDim2(0, 5, 0, 5)}>
					<Page page="GAME">
						<TowerLoadout />

						<TowerPlacementMessage />

						<TowerActionMenu />
						<RangeIndicator />

						<EnemyTooltipBillboard />
						<DamageIndicators />

						<SettingsButton />
						<ObjectivesButton />

						<Dialog />
						<MatchInfo />
					</Page>

					<Page page="SETTINGS">
						<SettingsMenu />
					</Page>

					<Page page="OBJECTIVES">
						<Objectives />
					</Page>
				</Frame>
			</Panel>
		</>
	);
}
