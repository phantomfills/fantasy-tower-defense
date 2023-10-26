import { ClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Events } from "client/network";
import { Possible, possible } from "shared/modules/util/possible";
import { Controller, OnStart } from "@flamework/core";

@Controller({})
export class ClientTowerRenderController implements OnStart {
	private clientTowers: ClientTower[];

	constructor() {
		this.clientTowers = [];
	}

	private addTower(tower: ClientTower) {
		this.clientTowers.push(tower);
	}

	private removeTower(tower: ClientTower) {
		const index = this.clientTowers.indexOf(tower);
		this.clientTowers.remove(index);
	}

	private getClientTowerFromId(id: string): Possible<ClientTower> {
		const possibleClientTower = possible<ClientTower>(
			this.clientTowers.find((clientTower: ClientTower) => {
				return clientTower.getId() === id;
			}),
		);

		return possibleClientTower;
	}

	private destroyClientTowerFromId(id: string) {
		const possibleClientTower = this.getClientTowerFromId(id);
		if (!possibleClientTower.exists) return;

		const clientTower = possibleClientTower.value;
		clientTower.destroy();
		this.removeTower(clientTower);
	}

	onStart() {
		Events.createTower.connect((towerType, id, cframe) => {
			const tower = createClientTower(towerType, id, cframe);
			this.addTower(tower);
		});
		Events.towerAttack.connect((id, towardsPosition) => {
			const possibleClientTower = this.getClientTowerFromId(id);
			if (!possibleClientTower.exists) return;

			const clientTower = possibleClientTower.value;
			clientTower.attack(towardsPosition);
		});
		Events.destroyTower.connect((id) => {
			this.destroyClientTowerFromId(id);
		});
	}
}
