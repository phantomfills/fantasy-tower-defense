import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { CollectionService, RunService, Workspace } from "@rbxts/services";
import { possible } from "shared/modules/utils/possible";
import { tags } from "shared/modules/utils/tags";
import { removeShadows } from "../rig/remove-shadows";
import { EnemyModel } from "shared/constants/enemy";

const ENEMY_ON_SCREEN_BUFFER_PIXELS = 50;

const MINIMUM_CLIENT_ENEMY_POSITION_OFFSET = -1;
const MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET = 1;

function getRandomOffset(random: Random): number {
	return random.NextNumber(MINIMUM_CLIENT_ENEMY_POSITION_OFFSET, MAXIMUM_CLIENT_ENEMY_POSITION_OFFSET);
}

function getRandomPositionOffset(random: Random): LuaTuple<[number, number]> {
	const positionOffsetX = getRandomOffset(random);
	const positionOffsetZ = getRandomOffset(random);

	return $tuple(positionOffsetX, positionOffsetZ);
}

export class ClientEnemy<T extends EnemyModel> {
	private readonly model: T;
	private id: string;
	private targetCFrame: CFrame;
	private maid: Maid;
	private random: Random;
	private positionOffset: Vector3;
	private locked: boolean = false;

	constructor(model: T, id: string, cframe: CFrame) {
		this.id = id;
		this.model = model;

		CollectionService.AddTag(this.model, tags.ENEMY);
		this.model.SetAttribute("id", id);
		removeShadows(model);

		this.maid = new Maid();
		this.targetCFrame = new CFrame();

		this.maid.GiveTask(model);

		this.targetCFrame = cframe;
		this.snapToCFrame(cframe);

		this.random = new Random(math.random(2147483647));

		const [positionOffsetX, positionOffsetZ] = getRandomPositionOffset(this.random);
		this.positionOffset = new Vector3(positionOffsetX, 0, positionOffsetZ);
	}

	getId(): string {
		return this.id;
	}

	getModel() {
		return this.model;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	getTargetCFrame(): CFrame {
		return this.targetCFrame;
	}

	setCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
		this.snapToCFrame(cframe);
	}

	setTargetCFrame(cframe: CFrame) {
		this.targetCFrame = cframe;
	}

	setLocked(locked: boolean) {
		this.locked = locked;
	}

	start() {
		let wasOnScreenLastFrame: boolean = false;

		this.maid.GiveTask(
			RunService.RenderStepped.Connect(() => {
				if (this.locked) return;

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
						0.15,
					),
				);
			}),
		);
	}

	destroy() {
		this.maid.Destroy();
	}
}
