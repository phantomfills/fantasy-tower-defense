import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";
import { RunService } from "@rbxts/services";

const MINIMUM_CLIENT_ENEMY_POSITION_OFFSET = -0.3;
const MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET = 0.3;

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export type GenericClientEnemy = ClientEnemy;

function getRandomOffset(random: Random): number {
	return random.NextInteger(MINIMUM_CLIENT_ENEMY_POSITION_OFFSET, MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET);
}

function getRandomPositionOffset(random: Random): LuaTuple<[number, number]> {
	const positionOffsetX = getRandomOffset(random);
	const positionOffsetZ = getRandomOffset(random);

	return $tuple(positionOffsetX, positionOffsetZ);
}

export class ClientEnemy {
	readonly model: EnemyModel;
	private id: string;
	private targetCFrame: CFrame;
	private maid: Maid;
	private random: Random;
	private positionOffset: Vector3;

	private renderedLastFrame: boolean;

	constructor(model: EnemyModel, id: string, cframe: CFrame) {
		this.id = id;
		this.model = model;

		this.maid = new Maid();
		this.targetCFrame = new CFrame();

		this.maid.GiveTask(model);

		this.targetCFrame = cframe;
		this.model.PivotTo(cframe);

		this.random = new Random(math.random(2147483647));

		const [positionOffsetX, positionOffsetZ] = getRandomPositionOffset(this.random);
		this.positionOffset = new Vector3(positionOffsetX, 0, positionOffsetZ);

		this.renderedLastFrame = false;

		this.start();
	}

	setRenderedLastFrame(value: boolean) {
		this.renderedLastFrame = value;
	}

	getRenderedLastFrame() {
		return this.renderedLastFrame;
	}

	getId(): string {
		return this.id;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	setCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
		this.snapToCFrame(cframe);
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
						0.1,
					),
				);
			}),
		);
	}

	destroy() {
		this.maid.Destroy();
	}
}
