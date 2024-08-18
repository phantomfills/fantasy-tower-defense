import React, { useEffect } from "@rbxts/react";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { images } from "shared/assets";
import { E_Trait } from "shared/modules/attack/trait";
import { KeyCode, useKeyPress } from "@rbxts/pretty-react-hooks";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Debris } from "@rbxts/services";
import { Group } from "../utils/group";
import { style } from "client/constants/style";

interface TowerActionButtonProps {
	name: string;
	size: UDim2;
	position: UDim2;
	color: Color3;
	autoButtonColor?: boolean;
	keybind: KeyCode | undefined;
	action: () => void;
}

function TowerActionButton({ name, size, position, color, autoButtonColor, keybind, action }: TowerActionButtonProps) {
	const rem = useRem();
	const keyDown = keybind && useKeyPress([keybind]);

	useEffect(() => {
		if (!keyDown) return;

		action();
	}, [keyDown]);

	return (
		<textbutton
			Size={size}
			Position={position}
			Text=""
			BackgroundColor3={color}
			Event={{ MouseButton1Click: action }}
			AutoButtonColor={autoButtonColor}
		>
			<Label
				size={new UDim2(1, 0, 1, 0)}
				textSize={rem(1.5)}
				text={`${keybind ? `(${keybind})` : "🔐"} ${name}`}
				font={fonts.inter.bold}
				backgroundTransparency={1}
				textColor={style.text}
			/>
			<OneThickWhiteStroke />
			<imagelabel
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				Image={images.stripes}
				ImageTransparency={0.8}
				ScaleType={Enum.ScaleType.Tile}
			/>
			<uicorner CornerRadius={new UDim(0, 10)} />
		</textbutton>
	);
}

interface Action {
	name: string;
	call: () => void;
}

interface TowerActionMenuFrameProps {
	owner: string;
	name: string;
	money: number;
	upgradeTitle: string;
	upgradeDescription: string;
	upgradeCost: number;
	level: number;
	close: () => void;
	traits: E_Trait[];
	actions: {
		upgrade: Action;
		sell: Action;
	};
	health: number;
	maxHealth: number;
	ownTower: boolean;
}

export function TowerActionMenuFrame({
	owner,
	name,
	level,
	actions,
	upgradeTitle,
	upgradeDescription,
	upgradeCost,
	money,
	close,
	traits,
	health,
	maxHealth,
	ownTower,
}: TowerActionMenuFrameProps) {
	const enoughMoney = money >= upgradeCost;
	const canPerformActions = enoughMoney && ownTower;

	const rem = useRem();

	return (
		<Frame
			size={new UDim2(0.15, 0, 0.5, 0)}
			position={new UDim2(0, 0, 0.25, 0)}
			backgroundTransparency={0.5}
			backgroundColor={style.background}
		>
			<imagebutton
				Size={new UDim2(0, 15, 0, 15)}
				Position={new UDim2(1, -25, 0, 10)}
				BackgroundTransparency={1}
				Image={images.x_button}
				Event={{ MouseButton1Click: close }}
			/>
			<Label
				text={`(${health}/${maxHealth} HP)`}
				size={new UDim2(1, 0, 0.1, 0)}
				position={new UDim2(0, 0, -0.1, 0)}
				textSize={rem(2.25)}
				font={fonts.inter.bold}
				textColor={style.text}
			/>
			<uicorner CornerRadius={new UDim(0, 3)} />
			<OneThickWhiteStroke />
			<Label
				size={new UDim2(1, 0, 0.15, 0)}
				position={new UDim2(0, 0, 0, 0)}
				textSize={rem(1.5)}
				font={fonts.inter.bold}
				text={`${owner}'s`}
				textColor={style.text}
			/>
			<Label
				size={new UDim2(1, 0, 0.175, 0)}
				position={new UDim2(0, 0, 0.035, 0)}
				textSize={rem(1.75)}
				font={fonts.inter.bold}
				text={`${name} Lv. ${level}`}
				textColor={style.text}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.275, -10)}
				color={canPerformActions ? style.green : style.red}
				name={ownTower ? actions.upgrade.name : "Not your tower!"}
				action={() => {
					const actionSound = canPerformActions ? sounds.buy_upgrade : sounds.error;

					const sound = createSound(actionSound, { volume: 0.2 });
					sound.Play();

					Debris.AddItem(sound, 2);

					if (enoughMoney) actions.upgrade.call();
				}}
				keybind={ownTower ? "E" : undefined}
				autoButtonColor={true}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.85, 0)}
				color={style.red}
				name={ownTower ? actions.sell.name : "Not your tower!"}
				action={() => {
					const sellSound = createSound(sounds.sell_tower, { volume: 0.2 });
					sellSound.Play();

					Debris.AddItem(sellSound, 2);

					actions.sell.call();
				}}
				keybind={ownTower ? "Backspace" : undefined}
				autoButtonColor={true}
			/>
			<Label
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.15, -5)}
				font={fonts.inter.bold}
				text={upgradeTitle}
				textColor={style.text}
				textSize={rem(1.75)}
			/>
			<Frame
				size={new UDim2(1, -30, 0.45, 0)}
				position={new UDim2(0, 15, 0.375, 0)}
				backgroundTransparency={0.8}
				backgroundColor={style.background}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 3)} />
				<uipadding
					PaddingTop={new UDim(0.1, 0)}
					PaddingLeft={new UDim(0.1, 0)}
					PaddingRight={new UDim(0.1, 0)}
				/>
				<Label
					size={new UDim2(1, 0, 1, 0)}
					textSize={rem(1.5)}
					font={fonts.inter.regular}
					text={upgradeDescription}
					textColor={style.text}
					textAlignmentX={Enum.TextXAlignment.Left}
					textAlignmentY={Enum.TextYAlignment.Top}
					textWrapped={true}
				/>
			</Frame>
			<Group size={new UDim2(0, 50, 0, 50)} position={new UDim2(0, -55, 0, 0)}>
				<uigridlayout
					CellSize={new UDim2(1, 0, 1, 0)}
					CellPadding={new UDim2(0, 5, 0, 5)}
					FillDirection={Enum.FillDirection.Horizontal}
				/>
				{traits.includes("STEALTH") ? (
					<Frame backgroundTransparency={0.5} backgroundColor={style.background}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.eye} />
						<uicorner CornerRadius={new UDim(0, 3)} />
					</Frame>
				) : (
					<></>
				)}
				{traits.includes("REINFORCED") ? (
					<Frame backgroundTransparency={0.5} backgroundColor={style.background}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.shield} />
						<uicorner CornerRadius={new UDim(0, 3)} />
					</Frame>
				) : (
					<></>
				)}
			</Group>
		</Frame>
	);
}
