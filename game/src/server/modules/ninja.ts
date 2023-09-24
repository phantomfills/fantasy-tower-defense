import { Enemy, GenericEnemyStats } from "./enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		super("NINJA", path, {
			health: 20,
			maxHealth: 20,
			speed: 4.5,
			animationId: 0,
		});
	}
}
