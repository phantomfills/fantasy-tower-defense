import { Service, OnStart } from "@flamework/core";
import { GenericTowerStats, Tower } from "server/modules/tower";
import { Workspace, ServerStorage } from "@rbxts/services";

@Service({})
export class TowerService implements OnStart {
	onStart() {
		const towerCFrame = new CFrame(11, 4, -13);
		const archerTemplate = ServerStorage.assets.towers.archer.models.archer;
		const archerModel = archerTemplate.Clone();
		archerModel.Parent = Workspace;
		const archer = new Tower<GenericTowerStats>(archerModel, {
			damage: 1,
			firerate: 1,
			range: 1,
			cframe: towerCFrame,
		});
	}
}
