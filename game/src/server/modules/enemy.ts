import Maid from "@rbxts/maid";
import Signal from "@rbxts/signal";
import { RunService, HttpService } from "@rbxts/services";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { EnemyType } from "shared/modules/enemy-type";

export interface GenericEnemyStats {
	health: number;
	maxHealth: number;
	speed: number;
	animationId: number;
}

export type GenericEnemy = Enemy<GenericEnemyStats>;

export class Enemy<T extends GenericEnemyStats> {
	private readonly path: PathWaypoint[];

	private stats: T;

	readonly onDeath: Signal;
	readonly onWaypointReached: Signal;

	private maid: Maid;

	private lastWaypoint: PathWaypoint;
	private nextWaypoint: PathWaypoint;
	private waypointAlpha: number;

	private readonly id: string;

	constructor(private readonly enemyType: EnemyType, path: PathWaypoint[], stats: T) {
		this.path = path;

		this.lastWaypoint = this.path[0];
		this.nextWaypoint = this.path[1];
		this.waypointAlpha = 0;

		this.stats = stats;

		this.onDeath = new Signal();
		this.onWaypointReached = new Signal();

		this.maid = new Maid();

		this.id = HttpService.GenerateGUID();

		this.maid.GiveTask(this.onWaypointReached);
		this.maid.GiveTask(() => {
			this.onDeath.Fire();
			this.onDeath.Destroy();
		});

		this.start();
	}

	getEnemyType() {
		return this.enemyType;
	}

	getPath() {
		return this.path;
	}

	takeDamage(damage: number) {
		this.stats.health -= damage;

		if (this.stats.health <= 0) this.destroy();
	}

	getLastPathWaypoint() {
		return this.lastWaypoint;
	}

	getNextPathWaypoint() {
		return this.nextWaypoint;
	}

	getWaypointAlpha() {
		return this.waypointAlpha;
	}

	getCFrame() {
		return this.lastWaypoint.waypointAttachment.WorldCFrame.Lerp(
			this.nextWaypoint.waypointAttachment.WorldCFrame,
			this.waypointAlpha,
		);
	}

	getPosition() {
		return this.lastWaypoint.waypointAttachment.WorldPosition.Lerp(
			this.nextWaypoint.waypointAttachment.WorldPosition,
			this.waypointAlpha,
		);
	}

	getCFrameRotation() {
		return this.lastWaypoint.waypointAttachment.WorldCFrame.Rotation.Lerp(
			this.nextWaypoint.waypointAttachment.WorldCFrame.Rotation,
			math.min(1, this.waypointAlpha * 3),
		);
	}

	getId() {
		return this.id;
	}

	private async moveToPathWaypointUntilTouching(previousPathWaypoint: PathWaypoint, nextPathWaypoint: PathWaypoint) {
		const previousPosition = previousPathWaypoint.waypointAttachment.WorldPosition;
		const nextPosition = nextPathWaypoint.waypointAttachment.WorldPosition;

		const dist = previousPosition.sub(nextPosition).Magnitude;

		const totalTime = dist / this.stats.speed;

		const startTime = DateTime.now().UnixTimestampMillis / 1000;

		let touchingPathWaypoint = false;
		let cancelTouchingPathWaypointCheck = false;
		this.maid.GiveTask(() => {
			cancelTouchingPathWaypointCheck = true;
		});

		while (!touchingPathWaypoint && !cancelTouchingPathWaypointCheck) {
			const now = DateTime.now().UnixTimestampMillis / 1000;
			const elapsedTime = now - startTime;
			const adjustedLerpAlpha = math.clamp(elapsedTime / totalTime, 0, 1);

			this.lastWaypoint = previousPathWaypoint;
			this.nextWaypoint = nextPathWaypoint;
			this.waypointAlpha = adjustedLerpAlpha;

			touchingPathWaypoint = adjustedLerpAlpha === 1;

			RunService.Heartbeat.Wait();
		}

		return;
	}

	private async progressThroughPath() {
		let cancelPathProgress = false;

		this.maid.GiveTask(() => {
			cancelPathProgress = true;
		});

		let pathWaypointIndex = 0;
		while (this.path[pathWaypointIndex + 1]) {
			this.onWaypointReached.Fire();

			if (cancelPathProgress) return;

			const pathWaypoint = this.path[pathWaypointIndex];
			const nextPathWaypoint = this.path[pathWaypointIndex + 1];

			await this.moveToPathWaypointUntilTouching(pathWaypoint, nextPathWaypoint);

			pathWaypointIndex += 1;
		}

		this.destroy(); // when reaching the end of the path
	}

	private start() {
		this.progressThroughPath();
	}

	private destroy() {
		this.maid.Destroy();
	}
}
