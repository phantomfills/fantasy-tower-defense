import { Enemy, GenericEnemyStats, PathWaypoint } from "./enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		super(path, {
			health: 20,
			maxHealth: 20,
			speed: 9,
			animationId: 0,
		});
	}
}
