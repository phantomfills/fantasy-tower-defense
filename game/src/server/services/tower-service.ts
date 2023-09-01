import { OnStart, Service } from "@flamework/core";
import { DamageDealtInfo, GenericTower, GenericTowerStats, Tower } from "server/modules/tower";
import { Workspace, ReplicatedStorage } from "@rbxts/services";
import { Signal } from "@rbxts/beacon";

@Service({})
export class TowerService implements OnStart {
	private towers: GenericTower[];
	readonly dealDamageFromTower: Signal<[tower: GenericTower, info: DamageDealtInfo]>;

	constructor() {
		this.towers = [];

		this.dealDamageFromTower = new Signal();
	}

	private addTower(tower: GenericTower) {
		this.towers.push(tower);

		tower.dealDamage.Connect((tower, info) => {
			this.dealDamageFromTower.Fire(tower, info);
		});
	}

	onStart() {
		const towerCFrame = new CFrame(11, 4, -13);
		const archerTemplate = ReplicatedStorage.assets.towers.archer.models.archer;
		const archerModel = archerTemplate.Clone();
		archerModel.Parent = Workspace;
		const archer = new Tower<GenericTowerStats>(archerModel, {
			damage: 10,
			firerate: 1,
			range: 1,
			cframe: towerCFrame,
		});
		this.addTower(archer);
	}
}
