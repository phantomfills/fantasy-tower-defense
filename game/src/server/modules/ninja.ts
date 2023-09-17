import { Enemy, GenericEnemyStats } from "./enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		super(path, {
			health: 20,
			maxHealth: 20,
			speed: 10,
			animationId: 0,
		});
	}
}
