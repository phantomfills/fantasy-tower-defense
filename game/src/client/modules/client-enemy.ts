import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export class ClientEnemy {
	private model: EnemyModel;

	constructor(model: EnemyModel) {
		this.model = model;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}
}
