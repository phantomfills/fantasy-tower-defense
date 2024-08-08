import React, { useState } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { ENEMY_DETAIL_VIEW_TYPE, EnemyDetailViewType, selectEnemyDetailViewType } from "client/store/settings";
import { producer } from "client/store";
import { useSelector } from "@rbxts/react-reflex";
import { ENEMY_DETAIL_VIEW_TYPE_TO_DISPLAY_NAME_MAP } from "client/modules/game/enemy-detail-view-type-to-display-text-map";
import { Debris, RunService } from "@rbxts/services";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { images } from "shared/assets";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";

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
		<Frame size={new UDim2(1, 0, 0, 30)}>
			<Label
				size={new UDim2(0.7, 0, 1, 0)}
				text={label}
				font={fonts.inter.regular}
				textColor={Color3.fromRGB(255, 255, 255)}
				textAlignmentX={Enum.TextXAlignment.Left}
			/>
			<Frame
				size={new UDim2(0.3, 0, 1, 0)}
				position={new UDim2(0.7, 0, 0, 0)}
				backgroundTransparency={0}
				backgroundColor={Color3.fromRGB(0, 255, 135)}
			>
				<imagelabel
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ImageTransparency={0.9}
					ImageColor3={Color3.fromRGB(27, 27, 27)}
					Image={images.stripes}
					ScaleType={Enum.ScaleType.Crop}
					ZIndex={3}
				/>
				<OneThickWhiteStroke />
				<Label
					size={new UDim2(1, 0, 1, 0)}
					backgroundTransparency={1}
					text={optionText}
					textColor={Color3.fromRGB(255, 255, 255)}
					font={fonts.inter.bold}
					zIndex={4}
				>
					<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
				</Label>
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
							position={new UDim2(0, 0, 0, 35 * (index + 1))}
							backgroundColor={Color3.fromRGB(0, 255, 135)}
							backgroundTransparency={0.5}
							zIndex={10}
						>
							<Label
								size={new UDim2(1, 0, 1, 0)}
								backgroundTransparency={1}
								text={optionToDisplayTextMap[option]}
								textColor={Color3.fromRGB(255, 255, 255)}
								font={fonts.inter.bold}
								zIndex={10}
							>
								<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
							</Label>
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
		</Frame>
	);
}

export function SettingsButton() {
	return (
		<Frame
			size={new UDim2(0, 30, 0, 30)}
			position={new UDim2(0, 0, 1, -30)}
			backgroundTransparency={0.5}
			backgroundColor={Color3.fromRGB(0, 0, 0)}
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
	const enemyDetailViewType: EnemyDetailViewType = RunService.IsRunning()
		? useSelector(selectEnemyDetailViewType)
		: "CLOSEST";

	return (
		<>
			<Frame
				size={new UDim2(0.3, 0, 0.5, 0)}
				position={new UDim2(0.5, 0, 0.4, 0)}
				anchorPoint={new Vector2(0.5, 0.5)}
				backgroundTransparency={0.5}
				backgroundColor={Color3.fromRGB(0, 0, 0)}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
				<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 5)} />
				<uipadding PaddingTop={new UDim(0, 10)} PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />

				<DropdownButton
					label="Enemy Tooltip View"
					options={[...ENEMY_DETAIL_VIEW_TYPE]}
					selectedOption={enemyDetailViewType}
					optionToDisplayTextMap={ENEMY_DETAIL_VIEW_TYPE_TO_DISPLAY_NAME_MAP}
					onOptionSelected={(option) => producer.setEnemyDetailViewType(option)}
				/>
			</Frame>
			<textbutton
				Position={new UDim2(0.35, 0, 0.7, 0)}
				Size={new UDim2(0.3, 0, 0, 30)}
				BackgroundTransparency={0}
				BackgroundColor3={Color3.fromRGB(255, 0, 0)}
				Text=""
				Event={{
					MouseButton1Click: () => {
						producer.setPage("GAME");

						playClickSound();
					},
				}}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
				<Label
					size={new UDim2(1, 0, 1, 0)}
					text="Back"
					font={fonts.inter.bold}
					textColor={Color3.fromRGB(255, 255, 255)}
				/>
				<OneThickWhiteStroke />
			</textbutton>
		</>
	);
}
