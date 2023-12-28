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

	return (
		<FollowMouse size={new UDim2(0.16, 0, 0.07, 0)} zIndex={5}>
			<EnemyTooltip
				_type={enemyDetails.exists ? enemyDetails.value._type : "WEAK_DUMMY"}
				health={enemyDetails.exists ? enemyDetails.value.health : 0}
			/>
		</FollowMouse>
	);
}
