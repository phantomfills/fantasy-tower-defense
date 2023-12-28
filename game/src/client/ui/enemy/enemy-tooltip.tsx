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

	const enemyStats = describeEnemyFromType(_type);
	const maxHealth = enemyStats.maxHealth;
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
		</Frame>
	);
}
