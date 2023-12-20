import { ClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Possible, possible } from "shared/modules/util/possible";
import { Controller, OnStart } from "@flamework/core";
import { store } from "client/store";
import { getAttacks, getTowers } from "shared/store/tower";
import { getEnemyFromId } from "shared/store/enemy";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/util/path-utils";

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

	onStart(): void {
		store.observe(getTowers, (tower, id) => {
			const clientTower = createClientTower(tower.type, id, tower.cframe);
			this.addTower(clientTower);

			return () => {
				this.destroyClientTowerFromId(id);
			};
		});

		store.observe(getAttacks, ({ towerId, enemyPosition }, id) => {
			const possibleClientTower = this.getClientTowerFromId(towerId);
			if (!possibleClientTower.exists) return;

			const clientTower = possibleClientTower.value;
			clientTower.attack(enemyPosition);
		});
	}
}
