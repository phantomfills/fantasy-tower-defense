import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

export type GenericClientEnemy = ClientEnemy;

export class ClientEnemy {
	private model: EnemyModel;
	private id: string;

	constructor(model: EnemyModel, id: string) {
		this.id = id;
		this.model = model;
	}

	getId(): string {
		return this.id;
	}

	snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}
}
