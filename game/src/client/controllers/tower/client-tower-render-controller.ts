import { ClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Possible, possible } from "shared/modules/utils/possible";
import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/store";
import { getAttacks, getTowers } from "shared/store/tower";

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

	getClientTowers(): ClientTower[] {
		return this.clientTowers;
	}

	onStart(): void {
		producer.observe(getTowers, (tower, id) => {
			const clientTower = createClientTower(tower.towerType, id, tower.cframe);
			this.addTower(clientTower);

			return () => {
				this.destroyClientTowerFromId(id);
			};
		});

		producer.observe(getAttacks, ({ towerId, enemyPosition }, _) => {
			const possibleClientTower = this.getClientTowerFromId(towerId);
			if (!possibleClientTower.exists) return;

			const clientTower = possibleClientTower.value;
			clientTower.attack(enemyPosition);
		});
	}
}
