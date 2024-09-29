import { TowerModel } from "shared/modules/tower/tower-model";
import { createObstructionBox, createRangeModel } from "./range-model";

export class RangeIndicator {
	private radius: number;
	private obstructionRadius: number;
	private enabled: boolean;
	private rangeModel: Model;
	private obstructionBox: Model;
	private readonly parent: TowerModel;

	constructor(radius: number, obstructionRadius: number, enabled: boolean = true, parent: TowerModel) {
		this.radius = radius;
		this.obstructionRadius = obstructionRadius;
		this.enabled = enabled;
		this.parent = parent;

		const rangeModel = createRangeModel(
			this.radius,
			parent.humanoidRootPart.rootAttachment.WorldPosition,
			this.enabled,
		);
		const obstructionBox = createObstructionBox(
			this.obstructionRadius,
			parent.humanoidRootPart.rootAttachment.WorldPosition,
		);
		rangeModel.Parent = this.parent;
		obstructionBox.Parent = this.parent;
		this.rangeModel = rangeModel;
		this.obstructionBox = obstructionBox;
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
