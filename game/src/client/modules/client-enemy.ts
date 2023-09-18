import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";
import { RunService } from "@rbxts/services";
import { Animatable } from "shared/modules/animatable";

const MINIMUM_CLIENT_ENEMY_POSITION_OFFSET = -0.3;
const MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET = 0.3;

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
	private random: Random;
	private positionOffset: Vector3;

	constructor(model: EnemyModel & Animatable, id: string, cframe: CFrame) {
		this.id = id;
		this.model = model;

		this.maid = new Maid();
		this.targetCFrame = new CFrame();

		this.maid.GiveTask(model);

		this.targetCFrame = cframe;
		this.model.PivotTo(cframe);

		this.random = new Random(math.random(2147483647));

		const positionOffsetX = this.random.NextNumber(
			MINIMUM_CLIENT_ENEMY_POSITION_OFFSET,
			MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET,
		);
		const positionOffsetZ = this.random.NextNumber(
			MINIMUM_CLIENT_ENEMY_POSITION_OFFSET,
			MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET,
		);
		this.positionOffset = new Vector3(positionOffsetX, 0, positionOffsetZ);

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
					this.model.humanoidRootPart.rootAttachment.WorldCFrame.Lerp(
						this.targetCFrame.add(this.positionOffset),
						0.065,
					),
				);
			}),
		);
	}

	destroy() {
		this.maid.Destroy();
	}
}
