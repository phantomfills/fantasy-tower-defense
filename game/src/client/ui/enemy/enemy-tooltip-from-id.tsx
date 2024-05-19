import React from "@rbxts/react";
import { FollowMouse } from "../utils/follow-mouse";
import { EnemyTooltip } from "./enemy-tooltip";
import { useSelector } from "@rbxts/react-reflex";
import { selectEnemyFocusDetails } from "client/store/enemy-focus";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

interface EnemyTooltipFromIdProps {
	id: string;
}

export function EnemyTooltipFromId({ id }: EnemyTooltipFromIdProps) {
	const currentTimestamp = getCurrentTimeInMilliseconds();

	const enemyDetails = useSelector(selectEnemyFocusDetails(id, currentTimestamp));
	if (!enemyDetails.exists) return <></>;

	return (
		<FollowMouse size={new UDim2(0, 175, 0, 50)} zIndex={5}>
			<EnemyTooltip enemyType={enemyDetails.value.enemyType} health={enemyDetails.value.health} />
		</FollowMouse>
	);
}
