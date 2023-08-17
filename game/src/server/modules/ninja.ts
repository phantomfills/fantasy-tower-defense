import { Enemy, GenericEnemyStats, PathWaypoint } from "./enemy";
import { ServerStorage, Workspace } from "@rbxts/services";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		const fooTemplate = ServerStorage.assets.enemies.foo.models.foo;

		const fooModel = fooTemplate.Clone();
		fooModel.Parent = Workspace;

		super(fooModel, path, {
			health: 20,
			maxHealth: 20,
			speed: 9,
			animationId: 0,
		});
	}
}
