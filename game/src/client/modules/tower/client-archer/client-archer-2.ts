import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientBowArcher } from "./client-bow-archer";
import { Workspace } from "@rbxts/services";

export class ClientArcher2 extends ClientBowArcher {
	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModel("ARCHER", 2);
		archerModel.Parent = Workspace;
		super(id, cframe, archerModel);
	}
}
