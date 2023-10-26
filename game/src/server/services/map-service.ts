import { Service } from "@flamework/core";
import { CombatService } from "./combat-service";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { possible } from "shared/modules/util/possible";

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

@Service({})
export class MapService {
	constructor(private combatService: CombatService) {}

	async start() {
		const gameMap = Workspace.gameMap;
		const pathFolder = gameMap.path;

		throwIfChildrenAreNotPathWaypoints(pathFolder);

		const path = pathFolder.GetChildren();
		if (!assertAllInstancesArePathWaypoints(path)) {
			throw "Not all children are path waypoints!";
		}

		await this.combatService.start(path);
	}

	tick() {
		this.combatService.tick();
	}
}
