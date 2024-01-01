import Maid from "@rbxts/maid";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";

export interface TowerModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export class ClientTower {
	private maid: Maid;

	constructor(private readonly model: TowerModel, private readonly id: string, private readonly cframe: CFrame) {
		this.maid = new Maid();
		this.maid.GiveTask(this.model);

		this.snapToCFrame(cframe);
	}

	private snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	attack(towardsPosition: Vector3) {
		const cframeWithTowerY = new Vector3(towardsPosition.X, this.cframe.Position.Y, towardsPosition.Z);
		this.snapToCFrame(CFrame.lookAt(this.cframe.Position, cframeWithTowerY));
	}

	getId() {
		return this.id;
	}

	destroy() {
		this.maid.Destroy();
	}
}
