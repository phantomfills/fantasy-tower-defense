import { Service } from "@flamework/core";
import { CombatService } from "./combat-service";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/path-waypoint";

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

function assertValueIsPathWaypoint(value: Instance): value is PathWaypoint {
	return value.FindFirstChild("waypointAttachment")!.IsA("Attachment");
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
