import { Workspace } from "@rbxts/services";
import { MapModel } from "../map/map-type-to-game-map-map";
import { possible } from "../utils/possible";

export function isValidPlacementPosition(map: MapModel, position: Vector3): boolean {
	const raycastParams = new RaycastParams();
	raycastParams.FilterDescendantsInstances = [map.placementArea];
	raycastParams.FilterType = Enum.RaycastFilterType.Include;

	const possibleRaycastResult = possible<RaycastResult>(
		Workspace.Raycast(position.add(new Vector3(0, 0.5, 0)), new Vector3(0, -0.51, 0), raycastParams),
	);
	if (!possibleRaycastResult.exists) return false;

	const raycastResult = possibleRaycastResult.value;
	const isValidPlacement = raycastResult.Instance.IsDescendantOf(map.placementArea.ground);
	if (!isValidPlacement) return false;

	return true;
}
