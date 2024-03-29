import { possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import { Workspace } from "@rbxts/services";

export function selectMap(state: SharedState) {
	return state.map.map;
}

export function selectLives(state: SharedState) {
	return state.map.lives;
}

export function selectGameOver(state: SharedState) {
	return state.map.lives <= 0;
}

export function selectIsValidPlacementPart(hitPart: BasePart): (state: SharedState) => boolean {
	return (state) => {
		const placementArea = state.map.map.placementArea;
		return hitPart.IsDescendantOf(placementArea);
	};
}

export function selectIsValidPlacementPosition(
	position: Vector3,
	ignore?: Instance[],
): (state: SharedState) => boolean {
	return (state) => {
		const raycastParams = new RaycastParams();
		raycastParams.FilterDescendantsInstances = ignore ?? [];
		raycastParams.FilterType = Enum.RaycastFilterType.Exclude;

		const possibleRaycastResult = possible<RaycastResult>(
			Workspace.Raycast(position.add(new Vector3(0, 0.5, 0)), new Vector3(0, -0.6, 0), raycastParams),
		);
		if (!possibleRaycastResult.exists) return false;

		const raycastResult = possibleRaycastResult.value;
		const isValidPlacement = selectIsValidPlacementPart(raycastResult.Instance)(state);
		if (!isValidPlacement) return false;

		return true;
	};
}
