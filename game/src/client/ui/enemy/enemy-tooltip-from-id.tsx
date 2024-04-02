import React from "@rbxts/react";
import { FollowMouse } from "../utils/follow-mouse";
import { EnemyTooltip } from "./enemy-tooltip";
import { useSelector } from "@rbxts/react-reflex";
import { selectEnemyFocusDetails } from "client/store/enemy-focus";

interface EnemyTooltipFromIdProps {
	id: string;
}

export function EnemyTooltipFromId({ id }: EnemyTooltipFromIdProps) {
	const enemyDetails = useSelector(selectEnemyFocusDetails(id));
	if (!enemyDetails.exists) return <></>;

	return (
		<FollowMouse size={new UDim2(0, 175, 0, 50)} zIndex={5}>
			<EnemyTooltip _type={enemyDetails.value._type} health={enemyDetails.value.health} />
		</FollowMouse>
	);
}
