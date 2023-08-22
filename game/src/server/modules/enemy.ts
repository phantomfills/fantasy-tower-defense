import Maid from "@rbxts/maid";
import Signal from "@rbxts/signal";
import { RunService, HttpService } from "@rbxts/services";

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
	private model: EnemyModel;
	private rootPart: BasePart & {
		rootAttachment: Attachment;
	};
	private rootAttachment: Attachment;

	private alignPosition: AlignPosition;
	private alignOrientation: AlignOrientation;

	private path: PathWaypoint[];

	private stats: T;

	readonly onDeath: Signal;

	private maid: Maid;

	readonly id: string;

	constructor(model: EnemyModel, path: PathWaypoint[], stats: T) {
		this.model = model;
		this.rootPart = this.model.humanoidRootPart;
		this.rootAttachment = this.rootPart.rootAttachment;

		this.path = path;

		this.alignPosition = new Instance("AlignPosition");
		this.alignPosition.MaxForce = math.huge;
		this.alignPosition.MaxVelocity = stats.speed;
		this.alignPosition.Responsiveness = 200;
		this.alignPosition.Attachment0 = this.rootAttachment;
		this.alignPosition.Parent = this.rootAttachment;

		this.alignOrientation = new Instance("AlignOrientation");
		this.alignOrientation.RigidityEnabled = true;
		this.alignOrientation.Attachment0 = this.rootAttachment;
		this.alignOrientation.Parent = this.rootAttachment;

		this.stats = stats;

		this.onDeath = new Signal();

		this.maid = new Maid();

		this.id = HttpService.GenerateGUID();

		this.maid.GiveTask(() => {
			this.onDeath.Fire();
			this.onDeath.Destroy();
		});
		this.maid.GiveTask(this.model);

		this.snapToPathWaypoint(this.path[0]);
		this.progressThroughPath();
	}

	takeDamage(damage: number) {
		this.stats.health -= damage;
	}

	getHealth(): number {
		return this.stats.health;
	}

	getMaxHealth(): number {
		return this.stats.maxHealth;
	}

	snapToPathWaypoint(pathWaypoint: PathWaypoint) {
		const rootAttachmentOffset = this.rootAttachment.Position; // relative to root part

		const waypointAttachment = pathWaypoint.waypointAttachment;
		const waypointAttachmentWorldCFrame = waypointAttachment.WorldCFrame;
		const waypointAttachmentWorldCFrameWithRootAttachmentOffset =
			waypointAttachmentWorldCFrame.sub(rootAttachmentOffset);

		this.model.PivotTo(waypointAttachmentWorldCFrameWithRootAttachmentOffset);
	}

	setTargetPathWaypoint(pathWaypoint: PathWaypoint) {
		this.alignPosition.Attachment1 = pathWaypoint.waypointAttachment;
		this.alignOrientation.Attachment1 = pathWaypoint.waypointAttachment;
	}

	async moveToPathWaypointUntilTouching(pathWaypoint: PathWaypoint) {
		this.setTargetPathWaypoint(pathWaypoint);

		const checkTouchingPathWaypoint = () => {
			const touchingPathWaypoint = this.isTouchingPathWaypoint(pathWaypoint);
			return touchingPathWaypoint;
		};

		let touchingPathWaypoint = false;
		let cancelTouchingPathWaypointCheck = false;

		this.maid.GiveTask(() => {
			cancelTouchingPathWaypointCheck = true;
		});

		while (!touchingPathWaypoint && !cancelTouchingPathWaypointCheck) {
			touchingPathWaypoint = checkTouchingPathWaypoint();
			RunService.Heartbeat.Wait();
		}

		return;
	}

	async progressThroughPath() {
		let cancelPathProgress = false;

		this.maid.GiveTask(() => {
			cancelPathProgress = true;
		});

		for (const pathWaypoint of this.path) {
			if (cancelPathProgress) return;

			await this.moveToPathWaypointUntilTouching(pathWaypoint);
		}

		this.destroy(); // when reaching the end of the path
	}

	getDistanceToPathWaypoint(pathWaypoint: PathWaypoint) {
		const waypointAttachment = pathWaypoint.waypointAttachment;
		return this.rootAttachment.WorldPosition.sub(waypointAttachment.WorldPosition).Magnitude;
	}

	isTouchingPathWaypoint(pathWaypoint: PathWaypoint) {
		const distance = this.getDistanceToPathWaypoint(pathWaypoint);
		return distance <= 0.1;
	}

	destroy() {
		this.maid.Destroy();
	}
}
