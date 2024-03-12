import Roact = require("@rbxts/roact");
import { fonts } from "../constants/fonts";
import { Label } from "../utils/label";
import { useRem } from "../hooks/use-rem";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

interface EnemyDamageIndicatorProps {
	damage: number;
	position: Vector3;
	spawnTime: number;
}

const DAMAGE_INDICATOR_ANIMATION_TIME = 200;

function lerp(number: number, goal: number, alpha: number) {
	return number + (goal - number) * alpha;
}

export function EnemyDamageIndicator({ damage, position, spawnTime }: EnemyDamageIndicatorProps) {
	const rem = useRem();

	const currentTime = getCurrentTimeInMilliseconds();
	const timeSinceSpawn = currentTime - spawnTime;

	const random = new Random(spawnTime);
	const xOffset = random.NextNumber(-0.45, 0.45);
	const yOffset = random.NextNumber(-0.45, 0.45);
	const zOffset = random.NextNumber(-0.45, 0.45);

	return (
		<billboardgui
			Size={new UDim2(0, 500, 0, 275)}
			AlwaysOnTop={true}
			StudsOffsetWorldSpace={position.add(
				new Vector3(
					xOffset,
					lerp(1.5 + yOffset, 2.75, math.min(1, timeSinceSpawn / DAMAGE_INDICATOR_ANIMATION_TIME) + yOffset),
					zOffset,
				),
			)}
		>
			<Label
				size={new UDim2(1, 0, 1, 0)}
				text={`-${damage}`}
				textSize={rem(5)}
				backgroundTransparency={1}
				textColor={Color3.fromRGB(255, 0, 0)}
				font={fonts.inter.bold}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</Label>
		</billboardgui>
	);
}
