import Maid from "@rbxts/maid";
import { RunService } from "@rbxts/services";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export interface PathWaypoint extends BasePart {
	waypointAttachment: Attachment;
}

export class Enemy {
	private model: EnemyModel;
	private rootAttachment: Attachment;

	private alignPosition: AlignPosition;
	private alignOrientation: AlignOrientation;

	private path: PathWaypoint[];

	private maid: Maid;

	constructor(model: EnemyModel, path: PathWaypoint[]) {
		this.model = model;
		this.rootAttachment = this.model.humanoidRootPart.rootAttachment;

		this.path = path;

		this.alignPosition = new Instance("AlignPosition");
		this.alignPosition.MaxForce = math.huge;
		this.alignPosition.MaxVelocity = 20;
		this.alignPosition.Responsiveness = 200;
		this.alignPosition.Attachment0 = this.rootAttachment;
		this.alignPosition.Parent = this.rootAttachment;

		this.alignOrientation = new Instance("AlignOrientation");
		this.alignOrientation.RigidityEnabled = true;
		this.alignOrientation.Attachment0 = this.rootAttachment;
		this.alignOrientation.Parent = this.rootAttachment;

		this.maid = new Maid();
		this.maid.GiveTask(this.model);

		this.snapToPathWaypoint(this.path[0]);
		this.progressThroughPath();

		task.wait(4);

		this.destroy();
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
