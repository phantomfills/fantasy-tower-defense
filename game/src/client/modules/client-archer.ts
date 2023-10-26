import { ClientTower } from "./client-tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class ClientArcher extends ClientTower {
	constructor(id: string, cframe: CFrame) {
		const archerModel = ReplicatedStorage.assets.towers.archer.models.archer.Clone();
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);
	}
}
