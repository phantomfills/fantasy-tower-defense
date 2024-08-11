import React from "@rbxts/react";
import { style } from "client/constants/style";

interface OneThickWhiteStrokeProps {
	applyStrokeMode?: Enum.ApplyStrokeMode;
}

export function OneThickWhiteStroke({ applyStrokeMode = Enum.ApplyStrokeMode.Border }: OneThickWhiteStrokeProps) {
	return <uistroke Thickness={1} Color={style.outline} ApplyStrokeMode={applyStrokeMode} />;
}
