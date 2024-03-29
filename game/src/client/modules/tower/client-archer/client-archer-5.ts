import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientCrossbowArcher } from "./client-crossbow-archer";
import { Workspace } from "@rbxts/services";

export class ClientArcher5 extends ClientCrossbowArcher {
	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModel("ARCHER", 5);
		archerModel.Parent = Workspace;
		super(id, cframe, archerModel, Color3.fromRGB(237, 0, 255));
	}
}
