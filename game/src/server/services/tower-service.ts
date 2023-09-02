import { OnStart, Service } from "@flamework/core";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Archer } from "server/modules/archer";
import { Signal } from "@rbxts/beacon";
import { Events } from "server/network";

const assertCannotReach = (x: never) => {
	error("Cannot reach this place in the code");
};

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
		Events.placeTower.connect((player, towerType, cframe) => {
			switch (towerType) {
				case "ARCHER": {
					const archer = new Archer(cframe);
					this.addTower(archer);

					break;
				}
				default: {
					assertCannotReach(towerType);
				}
			}
		});
	}
}
