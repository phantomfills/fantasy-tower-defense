import { createProducer } from "@rbxts/reflex";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { possible } from "shared/modules/utils/possible";

export type Objective = "COMPLETE_LEVEL" | "EAT_CAKE";

interface Map {
	name: string;
	model: Model;
	path: PathWaypoint[];
	placementArea: Folder & {
		ground: Folder;
	};
}

type MapState = {
	map: Map;
	objectives: Objective[];
	lives: number;
};

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

const placementArea = Workspace.gameMap.placementArea;

const initialState: MapState = {
	map: {
		name: "Tutorial",
		model: Workspace.gameMap,
		path,
		placementArea,
	},
	objectives: ["COMPLETE_LEVEL", "EAT_CAKE"],
	lives: 2000,
};

export const mapSlice = createProducer(initialState, {
	deductLives: (state, lives: number) => ({
		...state,
		lives: math.max(state.lives - lives, 0),
	}),

	incrementLives: (state, lives: number) => ({
		...state,
		lives: state.lives + lives,
	}),
});
