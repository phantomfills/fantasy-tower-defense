import { Service } from "@flamework/core";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Signal } from "@rbxts/beacon";
import { Events } from "server/network";
import { createTower } from "server/modules/tower-factory";

@Service({})
export class TowerService {
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

	start() {
		Events.placeTower.connect((player, towerType, cframe) => {
			const tower = createTower(towerType, cframe);
			this.addTower(tower);
		});
	}
}
