import { TowerModel } from "shared/modules/tower/tower-model";

export interface DummyDefectPistolModel extends TowerModel {
	rightArm: BasePart & {
		pistol: {
			tipAttachment: Attachment;
		};
	};
}

export interface DummyDefectDualPistolModel extends DummyDefectPistolModel {
	leftArm: BasePart & {
		pistol: {
			tipAttachment: Attachment;
		};
	};
}
