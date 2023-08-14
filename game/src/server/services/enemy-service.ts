import { Service, OnStart } from "@flamework/core";
import { ServerStorage, Workspace } from "@rbxts/services";
import { Enemy } from "server/modules/enemy";
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

		const fooTemplate = ServerStorage.assets.enemies.foo.models.foo;

		const fooModel = fooTemplate.Clone();
		fooModel.Parent = Workspace;

		const foo = new Enemy(fooModel, path);

		// for (;;) {

		// 	task.wait(1);
		// }
	}
}
