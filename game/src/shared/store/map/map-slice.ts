import { createProducer } from "@rbxts/reflex";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { possible } from "shared/modules/utils/possible";

export interface Map {
	name: string;
	model: Model;
	path: PathWaypoint[];
}

export type MapState = Map;

function throwIfChildrenAreNotPathWaypoints<T extends Folder>(
	value: T & {
		[pathWaypoint in Exclude<keyof T, keyof Folder>]: T[pathWaypoint] extends PathWaypoint
			? T[pathWaypoint]
			: never;
	},
) {}

function assertAllInstancesArePathWaypoints(value: Instance[]): value is PathWaypoint[] {
	return value.every(assertValueIsPathWaypoint);
}

function assertValueIsPathWaypoint(instance: Instance): instance is PathWaypoint {
	const possibleWaypointAttachment = possible<Instance>(instance.FindFirstChild("waypointAttachment"));
	if (!possibleWaypointAttachment.exists) return false;

	const waypointAttachment = possibleWaypointAttachment.value;
	return classIs(waypointAttachment, "Attachment");
}

throwIfChildrenAreNotPathWaypoints(Workspace.gameMap.path);

const path = Workspace.gameMap.path.GetChildren();
if (!assertAllInstancesArePathWaypoints(path)) {
	throw "Not all children are path waypoints!";
}

const initialState: MapState = {
	name: "Ninja Hideaway",
	model: Workspace.gameMap,
	path,
};

export const mapSlice = createProducer(initialState, {});
