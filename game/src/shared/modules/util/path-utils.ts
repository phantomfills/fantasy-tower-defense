import { PathWaypoint } from "shared/modules/map/path-waypoint";

export function getCFrameFromPathCompletionAlpha(path: PathWaypoint[], pathCompletionAlpha: number) {
	const pathLength = getPathLength(path);
	const pathLengthCompletion = pathLength * pathCompletionAlpha;

	let totalDistance = 0;
	for (let i = 0; i < path.size() - 1; i++) {
		const waypoint = path[i];
		const nextWaypoint = path[i + 1];
		const distance = waypoint.Position.sub(nextWaypoint.Position).Magnitude;
		totalDistance += distance;

		if (totalDistance >= pathLengthCompletion) {
			const alpha = (pathLengthCompletion - (totalDistance - distance)) / distance;
			const position = waypoint.CFrame.Lerp(nextWaypoint.CFrame, alpha).Position;
			const rotation = waypoint.CFrame.Rotation.Lerp(
				nextWaypoint.CFrame.Rotation,
				math.min(alpha * 10, 1),
			).Rotation;
			return new CFrame(position).mul(rotation);
		}
	}

	return path[path.size() - 1].CFrame;
}

export function getPathLength(path: PathWaypoint[]) {
	let totalDistance = 0;
	for (let index = 0; index < path.size() - 1; index++) {
		const waypoint = path[index];
		const nextWaypoint = path[index + 1];
		totalDistance += waypoint.Position.sub(nextWaypoint.Position).Magnitude;
	}
	return totalDistance;
}
