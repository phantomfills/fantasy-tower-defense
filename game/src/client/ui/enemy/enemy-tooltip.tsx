import Roact, { useEffect } from "@rbxts/roact";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getEnemyDisplayName } from "shared/modules/enemy/enemy-type-to-display-name-map";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { images } from "shared/assets";
import { useRem } from "../hooks/use-rem";

interface EnemyTooltipProps {
	_type: EnemyType;
	health: number;
}

export function EnemyTooltip({ _type, health }: EnemyTooltipProps) {
	const rem = useRem();

	const { maxHealth, immunities } = describeEnemyFromType(_type);
	const healthPercent = health / maxHealth;

	const enemyDisplayName = getEnemyDisplayName(_type);

	return (
		<Frame size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 20, 0, 0)}>
			<Label
				size={new UDim2(1, 0, 0.5, 0)}
				text={enemyDisplayName}
				font={fonts.inter.bold}
				textColor={Color3.fromRGB(255, 255, 255)}
				textAlignmentX={Enum.TextXAlignment.Left}
				textAlignmentY={Enum.TextYAlignment.Center}
				textSize={rem(2)}
			>
				<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
			</Label>
			<Frame
				size={new UDim2(1, -10, 0.5, 0)}
				position={new UDim2(0, 10, 0.5, 0)}
				backgroundColor={Color3.fromRGB(27, 27, 27)}
				backgroundTransparency={0}
			>
				<OneThickWhiteStroke />
				<imagelabel
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundTransparency={1}
					ImageTransparency={0.9}
					ImageColor3={Color3.fromRGB(27, 27, 27)}
					Image={images.stripes}
					ScaleType={Enum.ScaleType.Crop}
					ZIndex={3}
				/>
				<Frame
					size={new UDim2(healthPercent, 0, 1, 0)}
					backgroundColor={Color3.fromRGB(15, 237, 89)}
					backgroundTransparency={0}
				/>
				<Frame size={new UDim2(1, 0, 1, 0)}>
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
						size={new UDim2(0.88, 0, 0.9, 0)}
						text={`${health} / ${maxHealth}`}
						font={fonts.inter.bold}
						textColor={Color3.fromRGB(255, 255, 255)}
						textAlignmentX={Enum.TextXAlignment.Left}
						zIndex={4}
						textSize={rem(2)}
					>
						<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
					</Label>
				</Frame>
			</Frame>
			<Frame size={new UDim2(1, 0, 0.6, 0)} position={new UDim2(0, 0, 1, 5)}>
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 5)} />
				{immunities.includes("STEALTH") && (
					<Frame
						size={new UDim2(0.5, 0, 1, 0)}
						position={new UDim2(0, 0, 1, 5)}
						backgroundColor={Color3.fromRGB(45, 45, 45)}
						backgroundTransparency={0}
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
						<imagelabel
							Size={new UDim2(0.3, 0, 1, 0)}
							Position={new UDim2(0.05, 0, 0, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0}
							ImageColor3={Color3.fromRGB(255, 255, 255)}
							Image={images.eye}
							ScaleType={Enum.ScaleType.Fit}
						/>
						<Label
							size={new UDim2(0.7, 0, 1, 0)}
							position={new UDim2(0.3, 0, 0, 0)}
							text={"Stealth"}
							font={fonts.inter.bold}
							textColor={Color3.fromRGB(255, 255, 255)}
							textAlignmentX={Enum.TextXAlignment.Center}
							textAlignmentY={Enum.TextYAlignment.Center}
							textSize={rem(1.5)}
						>
							<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
						</Label>
						<uicorner CornerRadius={new UDim(0, 5)} />
						<OneThickWhiteStroke />
					</Frame>
				)}
				{immunities.includes("REINFORCED") && (
					<Frame
						size={new UDim2(0.65, 0, 1, 0)}
						position={new UDim2(0, 0, 1, 5)}
						backgroundColor={Color3.fromRGB(45, 45, 45)}
						backgroundTransparency={0}
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
						<imagelabel
							Size={new UDim2(0.3, 0, 1, 0)}
							Position={new UDim2(0, 0, 0, 0)}
							BackgroundTransparency={1}
							ImageTransparency={0}
							ImageColor3={Color3.fromRGB(255, 255, 255)}
							Image={images.shield}
							ScaleType={Enum.ScaleType.Fit}
						/>
						<Label
							size={new UDim2(0.7, 0, 1, 0)}
							position={new UDim2(0.3, 0, 0, 0)}
							text={"Reinforced"}
							font={fonts.inter.bold}
							textColor={Color3.fromRGB(255, 255, 255)}
							textAlignmentX={Enum.TextXAlignment.Center}
							textAlignmentY={Enum.TextYAlignment.Center}
							textSize={rem(1.5)}
						>
							<uistroke Thickness={2} Color={Color3.fromRGB(27, 27, 27)} />
						</Label>
						<uicorner CornerRadius={new UDim(0, 5)} />
						<OneThickWhiteStroke />
					</Frame>
				)}
			</Frame>
		</Frame>
	);
}
