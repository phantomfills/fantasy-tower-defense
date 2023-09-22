import { Service } from "@flamework/core";
import { CombatService } from "./combat-service";
import { Workspace } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/path-waypoint";

const getChildrenAs = <T>(instance: Instance) => {
	return instance.GetChildren() as T[];
};

@Service({})
export class MapService {
	constructor(private combatService: CombatService) {}

	async start() {
		const gameMap = Workspace.gameMap;
		const path = getChildrenAs<PathWaypoint>(gameMap.path);

		await this.combatService.start(path);
	}

	tick() {
		this.combatService.tick();
	}
}
