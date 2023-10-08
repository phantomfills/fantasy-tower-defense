import { Workspace } from "@rbxts/services";
import { possible } from "./possible";

export const getPositionOnScreen = (position: Vector3, margin: number): boolean => {
	const possibleCamera = possible(Workspace.CurrentCamera);
	if (!possibleCamera.exists) return false;

	const camera = possibleCamera.value;
	const viewportX = camera.ViewportSize.X + margin;
	const viewportY = camera.ViewportSize.Y + margin;
	const screenPoint = camera.WorldToScreenPoint(position)[0];
	if (
		screenPoint.X >= -margin &&
		screenPoint.X <= viewportX &&
		screenPoint.Y >= -margin &&
		screenPoint.Y <= viewportY &&
		screenPoint.Z > -margin
	)
		return true;
	return false;
};
