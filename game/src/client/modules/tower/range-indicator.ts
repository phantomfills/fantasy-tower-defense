import { TowerModel } from "shared/modules/tower/tower-model";
import { createRangeModel } from "./range-model";

export class RangeIndicator {
	private radius: number;
	private enabled: boolean;
	private rangeModel: Model;
	private readonly parent: TowerModel;

	constructor(radius: number, enabled: boolean = true, parent: TowerModel) {
		this.radius = radius;
		this.enabled = enabled;
		this.parent = parent;

		const rangeModel = createRangeModel(
			this.radius,
			parent.humanoidRootPart.rootAttachment.WorldPosition,
			this.enabled,
		);
		rangeModel.Parent = this.parent;
		this.rangeModel = rangeModel;
	}

	setEnabled(enabled: boolean) {
		const isSame = this.enabled === enabled;
		if (isSame) return;

		this.enabled = enabled;
		this.rangeModel.Destroy();

		this.rangeModel = createRangeModel(
			this.radius,
			this.parent.humanoidRootPart.rootAttachment.WorldPosition,
			enabled,
		);
		this.rangeModel.Parent = this.parent;
	}

	getEnabled() {
		return this.enabled;
	}
}
