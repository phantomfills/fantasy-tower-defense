import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { LifeCounter } from "./life-counter";
import { CashCounter } from "./cash-counter";
import { useSelector } from "@rbxts/react-reflex";
import { selectLives } from "shared/store/map";
import { Players } from "@rbxts/services";
import { selectMoney } from "shared/store/money";

const player = Players.LocalPlayer;
const userId = tostring(player.UserId);

export function MatchInfo() {
	const lives = useSelector(selectLives);
	const possibleMoney = useSelector(selectMoney(userId));

	return (
		<Frame size={new UDim2(0.15, 0, 1, -46)} anchorPoint={new Vector2(1, 1)} position={new UDim2(1, 0, 1, 0)}>
			<uigridlayout
				CellSize={new UDim2(1, 0, 0.075, 0)}
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Right}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>
			<LifeCounter lives={lives} key="life-counter" />
			<CashCounter value={possibleMoney.exists ? possibleMoney.value : 0} key="money-counter" />
		</Frame>
	);
}
