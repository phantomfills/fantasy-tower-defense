import { Enemy, GenericEnemyStats } from "./enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		super("NINJA", path, {
			health: 20,
			maxHealth: 20,
			speed: 5.5,
			animationId: 0,
		});
	}
}
