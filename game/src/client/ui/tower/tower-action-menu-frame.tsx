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

interface TowerActionButtonProps {
	name: string;
	size: UDim2;
	position: UDim2;
	color: Color3;
	autoButtonColor?: boolean;
	keybind: KeyCode;
	action: () => void;
}

function TowerActionButton({ name, size, position, color, autoButtonColor, keybind, action }: TowerActionButtonProps) {
	const rem = useRem();
	const keyDown = useKeyPress([keybind]);

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
				text={`(${keybind}) ${name}`}
				font={fonts.inter.bold}
				backgroundTransparency={1}
				textColor={Color3.fromRGB(255, 255, 255)}
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
}

export function TowerActionMenuFrame({
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
}: TowerActionMenuFrameProps) {
	const enoughMoney = money >= upgradeCost;

	const rem = useRem();

	return (
		<Frame
			size={new UDim2(0.15, 0, 0.5, 0)}
			position={new UDim2(0.85, 0, 0.25, 0)}
			backgroundTransparency={0.5}
			backgroundColor={new Color3(0, 0, 0)}
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
				textColor={new Color3(255, 255, 255)}
			/>
			<uicorner CornerRadius={new UDim(0, 3)} />
			<OneThickWhiteStroke />
			<Label
				size={new UDim2(1, 0, 0.15, 0)}
				position={new UDim2(0, 0, 0.025, 0)}
				textSize={rem(2.25)}
				font={fonts.inter.bold}
				text={`${name} Lv. ${level}`}
				textColor={new Color3(255, 255, 255)}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.275, -10)}
				color={enoughMoney ? Color3.fromRGB(5, 227, 97) : Color3.fromRGB(227, 0, 0)}
				name={actions.upgrade.name}
				action={() => {
					const actionSound = enoughMoney ? sounds.buy_upgrade : sounds.error;

					const sound = createSound(actionSound, { volume: 0.2 });
					sound.Play();

					Debris.AddItem(sound, 2);

					if (enoughMoney) actions.upgrade.call();
				}}
				keybind={"E"}
				autoButtonColor={enoughMoney}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.85, 0)}
				color={Color3.fromRGB(227, 0, 0)}
				name={actions.sell.name}
				action={() => {
					const sellSound = createSound(sounds.sell_tower, { volume: 0.2 });
					sellSound.Play();

					Debris.AddItem(sellSound, 2);

					actions.sell.call();
				}}
				keybind={"Backspace"}
				autoButtonColor={true}
			/>
			<Label
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.15, -5)}
				font={fonts.inter.bold}
				text={upgradeTitle}
				textColor={new Color3(255, 255, 255)}
				textSize={rem(1.75)}
			/>
			<Frame
				size={new UDim2(1, -30, 0.45, 0)}
				position={new UDim2(0, 15, 0.375, 0)}
				backgroundTransparency={0.8}
				backgroundColor={new Color3(0, 0, 0)}
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
					textColor={new Color3(255, 255, 255)}
					textAlignmentX={Enum.TextXAlignment.Left}
					textAlignmentY={Enum.TextYAlignment.Top}
					textWrapped={true}
				/>
			</Frame>
			<Frame size={new UDim2(0, 50, 0, 50)} position={new UDim2(0, -55, 0, 0)}>
				<uigridlayout
					CellSize={new UDim2(1, 0, 1, 0)}
					CellPadding={new UDim2(0, 5, 0, 5)}
					FillDirection={Enum.FillDirection.Horizontal}
				/>
				{traits.includes("STEALTH") ? (
					<Frame backgroundTransparency={0.5} backgroundColor={new Color3(0, 0, 0)}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.eye} />
						<uicorner CornerRadius={new UDim(0, 3)} />
					</Frame>
				) : (
					<></>
				)}
				{traits.includes("REINFORCED") ? (
					<Frame backgroundTransparency={0.5} backgroundColor={new Color3(0, 0, 0)}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.shield} />
						<uicorner CornerRadius={new UDim(0, 3)} />
					</Frame>
				) : (
					<></>
				)}
			</Frame>
		</Frame>
	);
}
