import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { EnemyTooltip } from "../enemy/enemy-tooltip";
import { Frame } from "../utils/frame";

export = (target: Frame) => {
	const enemyTooltip = (
		<Frame position={new UDim2(0.5, 0, 0.5, 0)} size={new UDim2(0.16, 0, 0.07, 0)}>
			<EnemyTooltip _type="WEAK_DUMMY" health={35} />
		</Frame>
	);

	const root = createRoot(target);
	root.render(enemyTooltip);

	return () => root.unmount();
};
