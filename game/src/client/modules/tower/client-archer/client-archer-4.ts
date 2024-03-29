import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientCrossbowArcher } from "./client-crossbow-archer";
import { Workspace } from "@rbxts/services";

export class ClientArcher4 extends ClientCrossbowArcher {
	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModel("ARCHER", 4);
		archerModel.Parent = Workspace;
		super(id, cframe, archerModel);
	}
}
