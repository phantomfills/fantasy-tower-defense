import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { RunService, Workspace } from "@rbxts/services";
import { possible } from "shared/modules/utils/possible";

const ENEMY_ON_SCREEN_BUFFER_PIXELS = 50;

const MINIMUM_CLIENT_ENEMY_POSITION_OFFSET = -0.5;
const MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET = 0.5;

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

function getRandomOffset(random: Random): number {
	return random.NextNumber(MINIMUM_CLIENT_ENEMY_POSITION_OFFSET, MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET);
}

function getRandomPositionOffset(random: Random): LuaTuple<[number, number]> {
	const positionOffsetX = getRandomOffset(random);
	const positionOffsetZ = getRandomOffset(random);

	return $tuple(positionOffsetX, positionOffsetZ);
}

export class ClientEnemy {
	private readonly model: EnemyModel;
	private id: string;
	private targetCFrame: CFrame;
	private maid: Maid;
	private random: Random;
	private positionOffset: Vector3;

	constructor(model: EnemyModel, id: string, cframe: CFrame) {
		this.id = id;
		this.model = model;

		this.model.SetAttribute("id", id);

		this.maid = new Maid();
		this.targetCFrame = new CFrame();

		this.maid.GiveTask(model);

		this.targetCFrame = cframe;
		this.snapToCFrame(cframe);

		this.random = new Random(math.random(2147483647));

		const [positionOffsetX, positionOffsetZ] = getRandomPositionOffset(this.random);
		this.positionOffset = new Vector3(positionOffsetX, 0, positionOffsetZ);

		this.start();
	}

	getId(): string {
		return this.id;
	}

	getModel(): EnemyModel {
		return this.model;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	private getTargetCFrame(): CFrame {
		return this.targetCFrame;
	}

	setCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
		this.snapToCFrame(cframe);
	}

	setTargetCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
	}

	start() {
		let wasOnScreenLastFrame: boolean = false;

		this.maid.GiveTask(
			RunService.RenderStepped.Connect(() => {
				const possibleCamera = possible<Camera>(Workspace.CurrentCamera);
				if (!possibleCamera.exists) return;

				const camera = possibleCamera.value;
				const viewportSize = camera.ViewportSize;
				const [screenPosition] = camera.WorldToViewportPoint(this.getTargetCFrame().Position);

				if (
					screenPosition.X < -ENEMY_ON_SCREEN_BUFFER_PIXELS &&
					screenPosition.Y < -ENEMY_ON_SCREEN_BUFFER_PIXELS &&
					screenPosition.X > viewportSize.X + ENEMY_ON_SCREEN_BUFFER_PIXELS &&
					screenPosition.Y > viewportSize.Y + ENEMY_ON_SCREEN_BUFFER_PIXELS
				) {
					return;
				}

				if (wasOnScreenLastFrame) {
					this.snapToCFrame(this.targetCFrame.add(this.positionOffset));
					wasOnScreenLastFrame = true;
					return;
				}

				this.snapToCFrame(
					this.model.humanoidRootPart.rootAttachment.WorldCFrame.Lerp(
						this.targetCFrame.add(this.positionOffset),
						0.5,
					),
				);
			}),
		);
	}

	destroy() {
		this.maid.Destroy();
	}
}
