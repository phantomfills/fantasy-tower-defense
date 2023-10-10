import { Service } from "@flamework/core";
import { CombatService } from "./combat-service";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/path-waypoint";

function checkChildrenArePathWaypoints<T extends Folder>(
	value: T & { [k in Exclude<keyof T, keyof Folder>]: T[k] extends PathWaypoint ? T[k] : never },
) {}

@Service({})
export class MapService {
	constructor(private combatService: CombatService) {}

	async start() {
		const gameMap = Workspace.gameMap;
		const pathFolder = gameMap.path;

		checkChildrenArePathWaypoints(pathFolder);
		const path = pathFolder.GetChildren() as PathWaypoint[];

		await this.combatService.start(path);
	}

	tick() {
		this.combatService.tick();
	}
}
