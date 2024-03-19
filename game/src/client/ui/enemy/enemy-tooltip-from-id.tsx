import Roact from "@rbxts/roact";
import { FollowMouse } from "../utils/follow-mouse";
import { EnemyTooltip } from "./enemy-tooltip";
import { useSelector } from "@rbxts/react-reflex";
import { getEnemyHoverDetailsFromId } from "client/store/enemy-hover";

interface EnemyTooltipFromIdProps {
	id: string;
}

export function EnemyTooltipFromId({ id }: EnemyTooltipFromIdProps) {
	const enemyDetails = useSelector(getEnemyHoverDetailsFromId(id));
	if (!enemyDetails.exists) return <></>;

	return (
		<FollowMouse size={new UDim2(0, 150, 0, 40)} zIndex={5}>
			<EnemyTooltip _type={enemyDetails.value._type} health={enemyDetails.value.health} />
		</FollowMouse>
	);
}
