import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { SinglePistolDummyDefect } from "./single-pistol-dummy-defect";

export class ClientDummyDefect1 extends SinglePistolDummyDefect {
	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 1);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);
	}
}
