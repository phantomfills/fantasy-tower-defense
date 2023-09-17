import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";
import { RunService } from "@rbxts/services";
import { Animatable } from "shared/modules/animatable";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export type GenericClientEnemy = ClientEnemy;

export class ClientEnemy {
	private model: EnemyModel;
	private id: string;
	private targetCFrame: CFrame;
	private maid: Maid;

	constructor(model: EnemyModel & Animatable, id: string, cframe: CFrame) {
		this.id = id;
		this.model = model;

		this.maid = new Maid();
		this.targetCFrame = new CFrame();

		this.maid.GiveTask(model);

		this.model.PivotTo(cframe);

		this.start();
	}

	getId(): string {
		return this.id;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	setTargetCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
	}

	start() {
		this.maid.GiveTask(
			RunService.Heartbeat.Connect(() => {
				this.snapToCFrame(
					this.model.humanoidRootPart.rootAttachment.WorldCFrame.Lerp(this.targetCFrame, 0.065),
				);
			}),
		);
	}

	destroy() {
		this.maid.Destroy();
	}
}
