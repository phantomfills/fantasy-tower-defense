import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { DualPistolDummyDefect } from "./dual-pistol-dummy-defect";
import { Workspace } from "@rbxts/services";

export class ClientDummyDefect5 extends DualPistolDummyDefect {
	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 5);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);
	}
}
