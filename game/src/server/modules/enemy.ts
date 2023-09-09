import Maid from "@rbxts/maid";
import Signal from "@rbxts/signal";
import { RunService, HttpService } from "@rbxts/services";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export interface GenericEnemyStats {
	health: number;
	maxHealth: number;
	speed: number;
	animationId: number;
}

export interface PathWaypoint extends BasePart {
	waypointAttachment: Attachment;
}

export type GenericEnemy = Enemy<GenericEnemyStats>;

export class Enemy<T extends GenericEnemyStats> {
	private readonly path: PathWaypoint[];

	private stats: T;

	readonly onDeath: Signal;

	private maid: Maid;

	private cframe: CFrame;
	private rotation: CFrame;

	private readonly id: string;

	constructor(path: PathWaypoint[], stats: T) {
		this.path = path;

		this.cframe = new CFrame(path[0].waypointAttachment.Position);
		this.rotation = path[0].waypointAttachment.WorldCFrame.Rotation;

		this.stats = stats;

		this.onDeath = new Signal();

		this.maid = new Maid();

		this.id = HttpService.GenerateGUID();

		this.maid.GiveTask(() => {
			this.onDeath.Fire();
			this.onDeath.Destroy();
		});

		this.progressThroughPath();
	}

	takeDamage(damage: number) {
		this.stats.health -= damage;

		if (this.stats.health <= 0) this.destroy();
	}

	getCFrame() {
		return this.cframe;
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

		this.rotation = nextPathWaypoint.waypointAttachment.WorldCFrame.Rotation;

		while (!touchingPathWaypoint && !cancelTouchingPathWaypointCheck) {
			const now = DateTime.now().UnixTimestampMillis / 1000;
			const elapsedTime = now - startTime;
			const adjustedLerpAlpha = math.clamp(elapsedTime / totalTime, 0, 1);
			const lerpedPosition = previousPosition.Lerp(nextPosition, adjustedLerpAlpha);

			this.cframe = new CFrame(lerpedPosition);

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
			if (cancelPathProgress) return;

			const pathWaypoint = this.path[pathWaypointIndex];
			const nextPathWaypoint = this.path[pathWaypointIndex + 1];

			await this.moveToPathWaypointUntilTouching(pathWaypoint, nextPathWaypoint);

			pathWaypointIndex += 1;
		}

		this.destroy(); // when reaching the end of the path
	}

	private destroy() {
		this.maid.Destroy();
	}
}
