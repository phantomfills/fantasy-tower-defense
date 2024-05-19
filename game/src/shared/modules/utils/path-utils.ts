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
	return path.reduce((total, currentWaypoint, currentIndex) => {
		const lastIndex = currentIndex - 1;
		if (lastIndex < 0) return 0;

		const lastWaypoint = path[lastIndex];
		const distance = lastWaypoint.Position.sub(currentWaypoint.Position).Magnitude;

		return total + distance;
	}, 0);
}

export function getPathCompletionAlpha(
	speed: number,
	pathLength: number,
	spawnTimestamp: number,
	currentTimestamp: number,
) {
	const timestampSinceSpawn = currentTimestamp - spawnTimestamp;
	const secondsSinceSpawn = timestampSinceSpawn / 1000;
	const distanceTravelled = secondsSinceSpawn * speed;
	const pathCompletionAlpha = distanceTravelled / pathLength;

	return pathCompletionAlpha;
}
