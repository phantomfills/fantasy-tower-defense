import React, { useState } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import {
	DIALOG_VISIBILITY_TYPE,
	DialogVisibilityType,
	ENEMY_DETAIL_VIEW_TYPE,
	EnemyDetailViewType,
	selectDialogVisibilityType,
	selectEnemyDetailViewType,
} from "client/store/settings";
import { producer } from "client/store";
import { useSelector } from "@rbxts/react-reflex";
import { ENEMY_DETAIL_VIEW_TYPE_TO_DISPLAY_NAME_MAP } from "client/modules/game/enemy-detail-view-type-to-display-text-map";
import { Debris, RunService } from "@rbxts/services";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { images } from "shared/assets";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Group } from "../utils/group";
import { style } from "client/constants/style";
import { Overlay } from "./overlay";
import { Blur } from "./blur";
import { DIALOG_VISIBILITY_TYPE_TO_DISPLAY_TEXT_MAP } from "client/modules/game/dialog-visibility-type-to-display-text-map";

function playClickSound() {
	const clickSound = createSound(sounds.click, { volume: 0.2 });
	clickSound.Play();

	Debris.AddItem(clickSound, 2);
}

interface DropdownButtonProps<T extends string> {
	label: string;
	options: T[];
	selectedOption: T;
	optionToDisplayTextMap: Record<T, string>;
	onOptionSelected: (option: T) => void;
}

export function DropdownButton<T extends string>({
	label,
	options,
	selectedOption,
	optionToDisplayTextMap,
	onOptionSelected,
}: DropdownButtonProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const optionText = optionToDisplayTextMap[selectedOption];

	return (
		<Group size={new UDim2(1, 0, 0, 30)}>
			<Label
				size={new UDim2(0.7, 0, 1, 0)}
				text={label}
				font={fonts.inter.regular}
				textColor={style.white}
				textAlignmentX={Enum.TextXAlignment.Left}
			/>
			<Frame
				size={new UDim2(0.3, 0, 1, 0)}
				position={new UDim2(0.7, 0, 0, 0)}
				backgroundTransparency={0}
				backgroundColor={style.black}
			>
				<imagelabel
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ImageTransparency={0.8}
					ImageColor3={style.black}
					Image={images.stripes}
					ScaleType={Enum.ScaleType.Crop}
					ZIndex={3}
				/>
				<OneThickWhiteStroke />
				<Label
					size={new UDim2(1, 0, 1, 0)}
					backgroundTransparency={1}
					text={optionText}
					textColor={style.white}
					font={fonts.inter.bold}
					zIndex={4}
				/>
				<textbutton
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					Text=""
					Event={{
						MouseButton1Click: () => {
							playClickSound();
							setIsOpen(!isOpen);
						},
					}}
				/>
				{isOpen &&
					options.map((option, index) => (
						<Frame
							size={new UDim2(1, 0, 0, 30)}
							position={new UDim2(1 * (index + 1), 5 * (index + 1), 0, 0)}
							backgroundColor={style.light_blue}
							backgroundTransparency={0.5}
							zIndex={10}
						>
							<Label
								size={new UDim2(1, 0, 1, 0)}
								backgroundTransparency={1}
								text={optionToDisplayTextMap[option]}
								textColor={style.white}
								font={fonts.inter.bold}
								zIndex={10}
							/>
							<textbutton
								Size={new UDim2(1, 0, 1, 0)}
								Text=""
								BackgroundTransparency={1}
								Event={{
									MouseButton1Click: () => {
										playClickSound();
										onOptionSelected(option);
										setIsOpen(false);
									},
								}}
							/>
							<uicorner CornerRadius={new UDim(0, 10)} />
							<OneThickWhiteStroke />
						</Frame>
					))}
			</Frame>
		</Group>
	);
}

export function SettingsButton() {
	return (
		<Frame
			size={new UDim2(0, 30, 0, 30)}
			position={new UDim2(0, 0, 1, -30)}
			backgroundTransparency={0.5}
			backgroundColor={style.black}
		>
			<textbutton
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				Text=""
				Event={{
					MouseButton1Click: () => {
						producer.setPage("SETTINGS");

						playClickSound();
					},
				}}
			/>
			<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.settings} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<OneThickWhiteStroke />
		</Frame>
	);
}

export function SettingsMenu() {
	const enemyDetailViewType: EnemyDetailViewType = useSelector(selectEnemyDetailViewType);
	const dialogVisibilityType: DialogVisibilityType = useSelector(selectDialogVisibilityType);

	return (
		<>
			<Overlay />
			<Blur />

			<Group
				size={new UDim2(0.3, 0, 0.5, 0)}
				position={new UDim2(0.5, 0, 0.5, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
			>
				<uilistlayout
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					FillDirection={Enum.FillDirection.Vertical}
					Padding={new UDim(0, 25)}
				/>
				<uipadding PaddingTop={new UDim(0, 10)} PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />

				<Label
					text="<u>Settings</u> ⚙"
					textColor={style.white}
					font={fonts.inter.bold}
					backgroundTransparency={1}
					size={new UDim2(1, 0, 0.12, 0)}
					richText={true}
					layoutOrder={0}
				/>

				<DropdownButton
					label="Enemy Tooltip View"
					options={[...ENEMY_DETAIL_VIEW_TYPE]}
					selectedOption={enemyDetailViewType}
					optionToDisplayTextMap={ENEMY_DETAIL_VIEW_TYPE_TO_DISPLAY_NAME_MAP}
					onOptionSelected={(option) => producer.setEnemyDetailViewType(option)}
				/>

				<DropdownButton
					label="Dialog Visible"
					options={[...DIALOG_VISIBILITY_TYPE]}
					selectedOption={dialogVisibilityType}
					optionToDisplayTextMap={DIALOG_VISIBILITY_TYPE_TO_DISPLAY_TEXT_MAP}
					onOptionSelected={(option) => producer.setDialogVisibilityType(option)}
				/>

				<textbutton
					Size={new UDim2(0.35, 0, 0, 30)}
					BackgroundTransparency={0}
					BackgroundColor3={style.red}
					Text=""
					Event={{
						MouseButton1Click: () => {
							producer.setPage("GAME");

							playClickSound();
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
					<Label size={new UDim2(1, 0, 1, 0)} text="Back" font={fonts.inter.bold} textColor={style.white} />
					<OneThickWhiteStroke />
				</textbutton>
			</Group>
		</>
	);
}
