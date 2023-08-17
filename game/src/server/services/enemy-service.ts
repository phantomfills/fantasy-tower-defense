import { Service, OnStart } from "@flamework/core";
import { ServerStorage, Workspace } from "@rbxts/services";
import { Ninja } from "../modules/ninja";
import { PathWaypoint } from "server/modules/enemy";

const getChildrenAs = <T>(instance: Instance) => {
	return instance.GetChildren() as T[];
};

@Service({})
export class EnemyService implements OnStart {
	onStart() {
		const path = getChildrenAs<PathWaypoint>(Workspace.gameMap.path);
		path.sort((previous, current) => {
			return previous.Name < current.Name;
		});

		for (;;) {
			const ninja = new Ninja(path);

			task.wait(1);
		}
	}
}
