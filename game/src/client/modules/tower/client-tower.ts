import Maid from "@rbxts/maid";
import { CollectionService, Debris } from "@rbxts/services";
import { TowerModel } from "shared/modules/tower/tower-model";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { tags } from "shared/modules/utils/tags";
export type GenericClientTower = ClientTower<TowerModel>;

export class ClientTower<T extends TowerModel> {
	private maid: Maid;

	constructor(private readonly model: T, private readonly id: string, private readonly cframe: CFrame) {
		this.maid = new Maid();
		this.maid.GiveTask(this.model);

		CollectionService.AddTag(this.model, tags.TOWER);

		this.snapToCFrame(cframe);
	}

	private snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
	}

	attack(towardsPosition: Vector3) {
		const positionWithTowerY = this.getPositionWithTowerY(towardsPosition);
		this.snapToCFrame(CFrame.lookAt(this.getCFrame().Position, positionWithTowerY));
	}

	getPositionWithTowerY(position: Vector3) {
		return new Vector3(position.X, this.getCFrame().Position.Y, position.Z);
	}

	getPositionWithTowerRootY(position: Vector3) {
		return new Vector3(position.X, this.getRootCFrame().Position.Y, position.Z);
	}

	getModel() {
		return this.model;
	}

	getCFrame() {
		return this.cframe;
	}

	getRootCFrame() {
		return this.getModel().humanoidRootPart.GetPivot();
	}

	getId() {
		return this.id;
	}

	destroy() {
		this.maid.Destroy();
	}
}
