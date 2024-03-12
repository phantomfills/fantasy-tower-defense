import { GenericClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Possible, possible } from "shared/modules/utils/possible";
import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/store";
import { getTowers } from "shared/store/tower";
import { getAttacks } from "shared/store/attack";

@Controller({})
export class ClientTowerRenderController implements OnStart {
	private clientTowers: GenericClientTower[];

	constructor() {
		this.clientTowers = [];
	}

	private addTower(tower: GenericClientTower) {
		this.clientTowers.push(tower);
	}

	private removeTower(tower: GenericClientTower) {
		const index = this.clientTowers.indexOf(tower);
		this.clientTowers.remove(index);
	}

	getClientTowerFromId(id: string): Possible<GenericClientTower> {
		const possibleClientTower = possible<GenericClientTower>(
			this.clientTowers.find((clientTower: GenericClientTower) => {
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

	getClientTowers(): GenericClientTower[] {
		return this.clientTowers;
	}

	onStart(): void {
		producer.observe(getTowers, ({ towerType, level, cframe }, id) => {
			const clientTower = createClientTower(towerType, level, id, cframe);
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
