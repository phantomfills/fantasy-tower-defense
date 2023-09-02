import { OnStart, Service } from "@flamework/core";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Archer } from "server/modules/archer";
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
		const archer = new Archer(towerCFrame);
		this.addTower(archer);
	}
}
