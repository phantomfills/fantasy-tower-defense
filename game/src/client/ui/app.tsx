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
import { SettingsButton, SettingsMenu } from "./game/settings-menu";
import { Page } from "./utils/page";
import { Group } from "./utils/group";

export function App() {
	return (
		<>
			<Music />
			<Panel>
				<Page page="GAME">
					<Group size={new UDim2(1, -10, 1, -10)} position={UDim2.fromOffset(5, 5)}>
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
					</Group>
				</Page>

				<Page page="SETTINGS">
					<SettingsMenu />
				</Page>

				<Page page="OBJECTIVES">
					<Objectives />
				</Page>
			</Panel>
		</>
	);
}
