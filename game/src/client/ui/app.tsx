import React from "@rbxts/react";
import { Panel } from "./utils/panel";
import { TowerLoadout } from "./tower/tower-loadout";
import { TowerPlacementMessage } from "./tower/tower-placement-message";
import { MatchInfo } from "./game/match-info";
import { TowerActionMenu } from "./tower/tower-action-menu";
import { Music } from "./music/music";
import { Dialog } from "./game/dialog";
import { RangeIndicator } from "./tower/range-part";
import { ObjectivesPage, ObjectivesButton } from "./game/objectives";
import { SettingsButton, SettingsMenu } from "./game/settings-menu";
import { Page } from "./utils/page";
import { Group } from "./utils/group";
import { OpeningObjectives } from "./welcome/opening-objectives";
import { ObstructionBoxes } from "./tower/obstruction-box";

export function App() {
	return (
		<>
			<Music />
			<Panel>
				<Page page="GAME">
					<Group size={new UDim2(1, -10, 1, -10)} position={UDim2.fromOffset(5, 5)}>
						<TowerLoadout />

						<TowerActionMenu />
						<RangeIndicator />

						<SettingsButton />
						<ObjectivesButton />

						<Dialog />
						<MatchInfo />
					</Group>
				</Page>

				<Page page="PLACING">
					<TowerPlacementMessage />
					<ObstructionBoxes />
				</Page>

				<Page page="SETTINGS">
					<SettingsMenu />
				</Page>

				<Page page="OBJECTIVES">
					<ObjectivesPage />
				</Page>

				<Page page="WELCOME">
					<OpeningObjectives />
				</Page>
			</Panel>
		</>
	);
}
