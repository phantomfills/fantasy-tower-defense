import React from "@rbxts/react";
import { LifeCounter } from "./life-counter";
import { CashCounter } from "./cash-counter";
import { useSelector } from "@rbxts/react-reflex";
import { selectLives } from "shared/store/level";
import { Players } from "@rbxts/services";
import { selectMoney } from "shared/store/money";
import { Group } from "../utils/group";

const player = Players.LocalPlayer;
const userId = player ? tostring(player.UserId) : "0";

export function MatchInfo() {
	const lives = useSelector(selectLives);
	const possibleMoney = useSelector(selectMoney(userId));

	return (
		<Group size={new UDim2(0.12, 0, 1, -46)} anchorPoint={new Vector2(1, 1)} position={new UDim2(1, 0, 1, 0)}>
			<uigridlayout
				CellSize={new UDim2(1, 0, 0.055, 0)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			<LifeCounter lives={lives} key="life-counter" />
			<CashCounter value={possibleMoney.exists ? possibleMoney.value : 0} key="money-counter" />
		</Group>
	);
}
