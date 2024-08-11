import React from "@rbxts/react";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getEnemyDisplayName } from "shared/modules/enemy/enemy-type-to-display-name-map";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { images } from "shared/assets";
import { selectEnemyFromId, selectEnemyHealthScaleFactor, selectEnemyPathCompletionAlpha } from "shared/store/enemy";
import { useSelector } from "@rbxts/react-reflex";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { abbreviateNumber } from "client/modules/number/abbreviate-number";
import { selectFocusEnemyId } from "client/store/enemy-focus";
import { producer } from "client/store";
import { Workspace } from "@rbxts/services";
import { possible } from "shared/modules/utils/possible";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { selectMapType } from "shared/store/level";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { selectEnemyDetailViewType } from "client/store/settings";
import { FollowMouse } from "../utils/follow-mouse";
import { Group } from "../utils/group";
import { style } from "client/constants/style";

interface EnemyTooltipProps {
	enemyType: EnemyType;
	health: number;
}

export function EnemyTooltip({ enemyType, health }: EnemyTooltipProps) {
	const enemyHealthScaleFactor = useSelector(selectEnemyHealthScaleFactor);

	const { maxHealth, traits } = describeEnemyFromType(enemyType);
	const effectiveMaxHealth = maxHealth * enemyHealthScaleFactor;
	const healthPercent = health / effectiveMaxHealth;

	const abbreviatedHealth = abbreviateNumber(health);
	const abbreviatedEffectiveMaxHealth = abbreviateNumber(effectiveMaxHealth);

	const enemyDisplayName = getEnemyDisplayName(enemyType);

	return (
		<Group size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 10, 0, 10)} clipsDescendants={false}>
			<Label
				size={new UDim2(1, 0, 0.35, 0)}
				text={enemyDisplayName}
				font={fonts.inter.bold}
				textColor={style.text}
				textAlignmentX={Enum.TextXAlignment.Left}
				textAlignmentY={Enum.TextYAlignment.Center}
				zIndex={4}
			>
				<uistroke Thickness={2} Color={style.outline} />
			</Label>
			<Frame
				size={new UDim2(1, -10, 0.3, 0)}
				position={new UDim2(0, 10, 0.3, 0)}
				backgroundColor={style.background}
			>
				<OneThickWhiteStroke />
				<imagelabel
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ImageTransparency={0.9}
					ImageColor3={style.background}
					Image={images.stripes}
					ScaleType={Enum.ScaleType.Crop}
					ZIndex={3}
				/>
				<Frame size={new UDim2(healthPercent, 0, 1, 0)} backgroundColor={style.red} />
				<Group size={new UDim2(1, 0, 1, 0)}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						VerticalAlignment={Enum.VerticalAlignment.Bottom}
						Padding={new UDim(0, 5)}
					/>
					<imagelabel
						Image={images.pixel_heart}
						Size={new UDim2(0.12, 0, 1, 0)}
						BackgroundTransparency={1}
						ImageTransparency={0}
					/>
					<Label
						size={new UDim2(0.88, 0, 1, 0)}
						text={`${abbreviatedHealth} / ${abbreviatedEffectiveMaxHealth}`}
						font={fonts.inter.bold}
						textColor={style.text}
						textAlignmentX={Enum.TextXAlignment.Left}
						zIndex={4}
					/>
				</Group>
			</Frame>
			<Group size={new UDim2(1, 0, 0.4, 0)} position={new UDim2(0, 0, 0.6, 5)}>
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 5)} />
				{traits.includes("STEALTH") && (
					<Frame
						size={new UDim2(0.5, 0, 1, 0)}
						position={new UDim2(0, 0, 1, 5)}
						backgroundColor={style.background}
						backgroundTransparency={0.5}
					>
						<imagelabel
							Size={new UDim2(1, 0, 1, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0.9}
							ImageColor3={style.background}
							Image={images.stripes}
							ScaleType={Enum.ScaleType.Crop}
							ZIndex={3}
						/>
						<imagelabel
							Size={new UDim2(0.3, 0, 1, 0)}
							Position={new UDim2(0.05, 0, 0, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0}
							Image={images.eye}
							ScaleType={Enum.ScaleType.Fit}
						/>
						<Label
							size={new UDim2(0.5, 0, 1, 0)}
							position={new UDim2(0.4, 0, 0, 0)}
							text={"Stealth"}
							font={fonts.inter.bold}
							textColor={style.text}
							textAlignmentX={Enum.TextXAlignment.Center}
							textAlignmentY={Enum.TextYAlignment.Center}
						/>
						<uicorner CornerRadius={new UDim(0, 3)} />
						<OneThickWhiteStroke />
					</Frame>
				)}
				{traits.includes("REINFORCED") && (
					<Frame
						size={new UDim2(0.65, 0, 1, 0)}
						position={new UDim2(0, 0, 1, 5)}
						backgroundColor={style.background}
						backgroundTransparency={0.5}
					>
						<imagelabel
							Size={new UDim2(1, 0, 1, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0.9}
							ImageColor3={style.background}
							Image={images.stripes}
							ScaleType={Enum.ScaleType.Crop}
							ZIndex={3}
						/>
						<imagelabel
							Size={new UDim2(0.3, 0, 1, 0)}
							Position={new UDim2(0, 0, 0, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0}
							Image={images.shield}
							ScaleType={Enum.ScaleType.Fit}
						/>
						<Label
							size={new UDim2(0.6, 0, 1, 0)}
							position={new UDim2(0.35, 0, 0, 0)}
							text={"Reinforced"}
							font={fonts.inter.bold}
							textColor={style.text}
							textAlignmentX={Enum.TextXAlignment.Center}
							textAlignmentY={Enum.TextYAlignment.Center}
						/>
						<uicorner CornerRadius={new UDim(0, 3)} />
						<OneThickWhiteStroke />
					</Frame>
				)}
			</Group>
		</Group>
	);
}

interface EnemyTooltipBillboardFrameProps extends EnemyTooltipProps {
	position: Vector3;
}

const ENEMY_TOOLTIP_BILLBOARD_RENDER_DISTANCE = 50;

function EnemyTooltipBillboardFrame({ position, enemyType, health }: EnemyTooltipBillboardFrameProps) {
	return (
		<billboardgui
			StudsOffsetWorldSpace={position}
			Size={new UDim2(0, 150, 0, 60)}
			AlwaysOnTop={true}
			ClipsDescendants={false}
		>
			<EnemyTooltip enemyType={enemyType} health={health} />
		</billboardgui>
	);
}

export function EnemyTooltipBillboard() {
	const enemyDetailViewType = useSelector(selectEnemyDetailViewType);

	const possibleEnemyFocusId = useSelector(selectFocusEnemyId);
	if (!possibleEnemyFocusId.exists) {
		return <></>;
	}

	const possibleEnemy = producer.getState(selectEnemyFromId(possibleEnemyFocusId.value));
	if (!possibleEnemy.exists) {
		return <></>;
	}

	const enemy = possibleEnemy.value;

	const path = getGameMapFromMapType(producer.getState(selectMapType)).paths[enemy.path];

	const pathCompletionAlpha = producer.getState(
		selectEnemyPathCompletionAlpha(possibleEnemyFocusId.value, getCurrentTimeInMilliseconds()),
	);

	const { enemyType, health } = possibleEnemy.value;
	const position = getCFrameFromPathCompletionAlpha(path, pathCompletionAlpha).Position;

	const possibleCamera = possible<Camera>(Workspace.CurrentCamera);
	if (!possibleCamera.exists) {
		return <></>;
	}

	const camera = possibleCamera.value;
	const cameraPosition = camera.CFrame.Position;
	if (
		enemyDetailViewType === "CLOSEST" &&
		position.sub(cameraPosition).Magnitude > ENEMY_TOOLTIP_BILLBOARD_RENDER_DISTANCE
	) {
		return <></>;
	}

	return enemyDetailViewType === "CLOSEST" ? (
		<EnemyTooltipBillboardFrame position={position} enemyType={enemyType} health={health} />
	) : (
		<FollowMouse size={new UDim2(0, 150, 0, 60)}>
			<EnemyTooltip health={health} enemyType={enemyType} />
		</FollowMouse>
	);
}
