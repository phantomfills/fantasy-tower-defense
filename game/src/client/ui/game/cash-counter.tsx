import React from "@rbxts/react";
import { CashLabel } from "../game/cash-label";
import { CounterFrame } from "./counter-frame";
import { useRem } from "../hooks/use-rem";

interface CashCounterProps {
	value: number;
}

export function CashCounter({ value }: CashCounterProps) {
	const rem = useRem();

	return (
		<CounterFrame>
			<uicorner CornerRadius={new UDim(0, 3)} />
			<CashLabel value={value} size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 0, 0, 0)} textSize={rem(3)} />
		</CounterFrame>
	);
}
