import { Service } from "@flamework/core";
import { GenericTower, GenericTowerStats, Tower } from "server/modules/tower";
import { Workspace, ServerStorage } from "@rbxts/services";
import { LevelService } from "./level-service";
import { GenericEnemy } from "server/modules/enemy";

@Service({})
export class TowerService {
	private towers: GenericTower[];

	constructor() {
		this.towers = [];
	}

	addTower(tower: GenericTower) {
		this.towers.push(tower);
	}

	getTowers() {
		return this.towers;
	}

	initiate(getEnemies: () => GenericEnemy[]) {
		const towerCFrame = new CFrame(11, 4, -13);

		const archerTemplate = ServerStorage.assets.towers.archer.models.archer;

		const archerModel = archerTemplate.Clone();
		archerModel.Parent = Workspace;

		const archer = new Tower<GenericTowerStats>(
			archerModel,
			{
				damage: 1,
				firerate: 1,
				range: 1,
				cframe: towerCFrame,
			},
			this,
		);

		this.addTower(archer);

		task.wait(4);

		print(getEnemies());
	}
}
