import { OnStart, Service } from "@flamework/core";
import { GenericTower } from "../../shared/modules/tower/tower";
import { Events } from "server/network";
import { createTower } from "server/modules/tower/tower-factory";

@Service({})
export class TowerService implements OnStart {
	private towers: GenericTower[];

	constructor() {
		this.towers = [];
	}

	private addTower(tower: GenericTower) {
		this.towers.push(tower);
		Events.createTower.broadcast(tower.getTowerType(), tower.getId(), tower.getStat("cframe"));
	}

	onStart() {
		Events.placeTower.connect((player, towerType, cframe) => {
			const tower = createTower(towerType, cframe);
			this.addTower(tower);
		});
	}
}
