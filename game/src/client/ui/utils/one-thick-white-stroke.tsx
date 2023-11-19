import Roact from "@rbxts/roact";

export function OneThickWhiteStroke() {
	return <uistroke Thickness={1} Color={new Color3(1, 1, 1)} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />;
}
