import Maid from "@rbxts/maid";
import { RunService } from "@rbxts/services";

print("a");

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
		this.progressThroughPath(0);
	}

	snapToPathWaypoint(pathWaypoint: PathWaypoint) {
		const attachmentOffset = this.rootAttachment.Position;

		const waypointAttachment = pathWaypoint.waypointAttachment;
		const waypointWorldCFrame = waypointAttachment.WorldCFrame;
		const waypointWorldCFrameWithOffset = waypointWorldCFrame.sub(attachmentOffset);

		this.model.PivotTo(waypointWorldCFrameWithOffset);
	}

	setTargetPathWaypoint(pathWaypoint: PathWaypoint) {
		this.alignPosition.Attachment1 = pathWaypoint.waypointAttachment;
		this.alignOrientation.Attachment1 = pathWaypoint.waypointAttachment;
	}

	moveToPathWaypointUntilTouching(pathWaypoint: PathWaypoint): Promise<undefined> {
		this.setTargetPathWaypoint(pathWaypoint);

		const waypointPromise = new Promise<undefined>((resolve, reject, onCancel) => {
			const waypointHandle = RunService.Heartbeat.Connect(() => {
				const touchingNextWaypoint = this.isTouchingPathWaypoint(pathWaypoint);
				if (!touchingNextWaypoint) return;

				resolve(undefined);
				waypointHandle.Disconnect();
			});

			onCancel(() => {
				waypointHandle.Disconnect();
			});
		});

		this.maid.GiveTask(() => {
			waypointPromise.cancel();
		});

		return waypointPromise;
	}

	progressThroughPath(pathWaypointIndex: number) {
		const pathWaypoint = this.path[pathWaypointIndex];
		if (!pathWaypoint) {
			this.destroy();
			return;
		}

		this.moveToPathWaypointUntilTouching(pathWaypoint)
			.then(() => {
				this.progressThroughPath(pathWaypointIndex + 1);
			})
			.catch(warn);
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
