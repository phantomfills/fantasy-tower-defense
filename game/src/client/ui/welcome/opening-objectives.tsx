import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectLevelObjectives } from "shared/store/level";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { objectiveTypeToNameMap } from "shared/modules/game/objective-type-to-name-map";
import { Group } from "../utils/group";
import { Objectives, ObjectivesPage } from "../game/objectives";
import { ObjectiveCards } from "../game/objective-cards";
import { style } from "client/constants/style";
import { producer } from "client/store";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { Overlay } from "../game/overlay";
import { Blur } from "../game/blur";
import { Events } from "client/network";

export function OpeningObjectives() {
	const levelObjectives = useSelector(selectLevelObjectives);

	return (
		<>
			<Overlay />
			<Blur />

			<Objectives>
				<textbutton
					Size={new UDim2(0.3, 0, 0, 30)}
					BackgroundTransparency={0}
					BackgroundColor3={style.green}
					LayoutOrder={2}
					Text=""
					Event={{
						MouseButton1Click: () => {
							producer.setPage("GAME");
							Events.startLevel.fire();
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
					<Label
						size={new UDim2(1, 0, 1, 0)}
						text="Start"
						font={fonts.inter.bold}
						textColor={Color3.fromRGB(255, 255, 255)}
					/>
					<OneThickWhiteStroke />
				</textbutton>
			</Objectives>
		</>
	);
}
