import Roact from "@rbxts/roact";
import { CounterFrame } from "./counter-frame";
import { CashLabel } from "../game/cash-label";

interface CashCounterProps {
	value: number;
}

export function CashCounter({ value }: CashCounterProps) {
	return (
		<CounterFrame>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<CashLabel value={value} size={new UDim2(1, 0, 1, 0)} position={new UDim2(0, 0, 0, 0)} />
		</CounterFrame>
	);
}
