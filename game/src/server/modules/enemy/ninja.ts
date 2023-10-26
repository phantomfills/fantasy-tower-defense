import { Enemy, GenericEnemyStats } from "./enemy";
import { PathWaypoint } from "shared/modules/map/path-waypoint";

export class Ninja extends Enemy<GenericEnemyStats> {
	constructor(path: PathWaypoint[]) {
		super("NINJA", path, {
			health: 20,
			maxHealth: 20,
			speed: 8,
			animationId: 0,
		});
	}
}
