import Roact from "@rbxts/roact";
import { TowerType } from "shared/modules/tower/tower-type";
import { Frame } from "../utils/frame";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { getTowerDisplayNameFromType } from "shared/modules/tower/tower-type-to-display-name-map";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { fonts } from "../constants/fonts";
import { useSelector } from "@rbxts/react-reflex";
import { getPossibleTowerFromId } from "shared/store/tower";
import {
	describeTowerFromType,
	getChangesForLevel,
	getSellPriceForTower,
	getTowerUpgradeCost,
	getUpgradeDescription,
	getUpgradeTitle,
} from "shared/modules/tower/tower-type-to-tower-stats-map";
import { SELLBACK_RATE } from "shared/modules/money/sellback-rate";
import { images } from "shared/assets";
import { Immunity } from "shared/modules/attack/immunity";

interface TowerActionButtonProps {
	name: string;
	size: UDim2;
	position: UDim2;
	color: Color3;
	action: () => void;
}

function TowerActionButton({ name, size, position, color, action }: TowerActionButtonProps) {
	const rem = useRem();

	return (
		<textbutton
			Size={size}
			Position={position}
			Text=""
			BackgroundColor3={color}
			Event={{ MouseButton1Click: action }}
		>
			<Label
				size={new UDim2(1, 0, 1, 0)}
				textSize={rem(2)}
				text={name}
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
			<uicorner CornerRadius={new UDim(0, 8)} />
		</textbutton>
	);
}

interface Action {
	name: string;
	call: () => void;
}

interface TowerActionMenuProps {
	name: string;
	upgradeTitle: string;
	upgradeDescription: string;
	level: number;
	close: () => void;
	traits: Immunity[];
	actions: {
		upgrade: Action;
		sell: Action;
	};
}

export function TowerActionMenu({
	name,
	level,
	actions,
	upgradeTitle,
	upgradeDescription,
	close,
	traits,
}: TowerActionMenuProps) {
	const rem = useRem();

	return (
		<Frame
			size={new UDim2(0.2, 0, 0.65, 0)}
			position={new UDim2(0, 0, 0.175, 0)}
			backgroundTransparency={0.5}
			backgroundColor={new Color3(0, 0, 0)}
		>
			<imagebutton
				Size={new UDim2(0, 20, 0, 20)}
				Position={new UDim2(1, -30, 0, 10)}
				BackgroundTransparency={1}
				Image={images.x_button}
				Event={{ MouseButton1Click: close }}
			/>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<OneThickWhiteStroke />
			<Label
				size={new UDim2(1, 0, 0.15, 0)}
				textSize={rem(2.5)}
				font={fonts.inter.bold}
				text={`${name} Lv. ${level}`}
				textColor={new Color3(255, 255, 255)}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.15, 0)}
				color={Color3.fromRGB(5, 227, 97)}
				name={actions.upgrade.name}
				action={actions.upgrade.call}
			/>
			<TowerActionButton
				size={new UDim2(1, -30, 0.1, 0)}
				position={new UDim2(0, 15, 0.85, 0)}
				color={Color3.fromRGB(227, 0, 0)}
				name={actions.sell.name}
				action={actions.sell.call}
			/>
			<Frame
				size={new UDim2(1, -30, 0.55, 0)}
				position={new UDim2(0, 15, 0.275, 0)}
				backgroundTransparency={0.8}
				backgroundColor={new Color3(0, 0, 0)}
			>
				<OneThickWhiteStroke />
				<uicorner CornerRadius={new UDim(0, 8)} />
				<uipadding
					PaddingTop={new UDim(0.1, 0)}
					PaddingLeft={new UDim(0.1, 0)}
					PaddingRight={new UDim(0.1, 0)}
				/>
				<Label
					size={new UDim2(1, 0, 1, 0)}
					textSize={rem(2)}
					font={fonts.inter.bold}
					text={`${upgradeTitle}\n\n${upgradeDescription}`}
					textColor={new Color3(255, 255, 255)}
					textAlignmentX={Enum.TextXAlignment.Left}
					textAlignmentY={Enum.TextYAlignment.Top}
					textWrapped={true}
				/>
			</Frame>
			<Frame size={new UDim2(0, 50, 0, 50)} position={new UDim2(1, 5, 0, 0)}>
				<uigridlayout
					CellSize={new UDim2(1, 0, 1, 0)}
					CellPadding={new UDim2(0, 5, 0, 5)}
					FillDirection={Enum.FillDirection.Horizontal}
				/>
				{traits.includes("STEALTH") && (
					<Frame backgroundTransparency={0.5} backgroundColor={new Color3(0, 0, 0)}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.eye} />
						<uicorner CornerRadius={new UDim(0, 5)} />
					</Frame>
				)}
				{traits.includes("REINFORCED") && (
					<Frame backgroundTransparency={0.5} backgroundColor={new Color3(0, 0, 0)}>
						<OneThickWhiteStroke />
						<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.shield} />
						<uicorner CornerRadius={new UDim(0, 5)} />
					</Frame>
				)}
			</Frame>
		</Frame>
	);
}

interface TowerActionMenuFromIdProps {
	actions: {
		upgrade: () => void;
		sell: () => void;
	};
	close: () => void;
	towerId: string;
}

export function TowerActionMenuFromId({ towerId, actions, close }: TowerActionMenuFromIdProps) {
	const possibleTower = useSelector(getPossibleTowerFromId(towerId));
	if (!possibleTower.exists) {
		return <></>;
	}

	const tower = possibleTower.value;
	const { towerType, level } = tower;
	const towerDisplayName = getTowerDisplayNameFromType(towerType);

	const towerUpgradeCost = getTowerUpgradeCost(towerType, level + 1);
	const towerUpgradeCostMessage = towerUpgradeCost === 0 ? "Maxed baby!" : `Upgrade: $${towerUpgradeCost}`;

	const towerSellPrice = getSellPriceForTower(towerType, level, SELLBACK_RATE);

	const upgradeTitle = getUpgradeTitle(towerType, level + 1);
	const upgradeDescription = getUpgradeDescription(towerType, level + 1);

	const stats = describeTowerFromType(towerType, level);
	const traits = stats.traits;

	return (
		<TowerActionMenu
			name={towerDisplayName}
			level={level}
			actions={{
				upgrade: {
					name: towerUpgradeCostMessage,
					call: actions.upgrade,
				},
				sell: {
					name: `Sell: $${towerSellPrice}`,
					call: actions.sell,
				},
			}}
			close={close}
			upgradeTitle={upgradeTitle}
			upgradeDescription={upgradeDescription}
			traits={traits}
		/>
	);
}
