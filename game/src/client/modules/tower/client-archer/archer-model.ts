import { TowerModel } from "../client-tower";

export interface BowArcherModel extends TowerModel {
	rightArm: BasePart & {
		bow: BasePart & {
			bottomBeam: Beam;
			topBeam: Beam;
			middle: Attachment;
		};
	};
	leftArm: BasePart & {
		bowDrawAttachment: Attachment;
	};
}

export interface CrossbowArcherModel extends TowerModel {
	rightArm: BasePart & {
		crossbow: BasePart;
	};
}
