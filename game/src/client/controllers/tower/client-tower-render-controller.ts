import { ClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Possible, possible } from "shared/modules/util/possible";
import { Controller, OnStart } from "@flamework/core";
import { store } from "client/store";
import { getTowers } from "shared/store/tower";
import Object from "@rbxts/object-utils";

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
		store.subscribe(getTowers, (towers, lastTowers) => {
			for (const [id, tower] of pairs(towers)) {
				const lastTower = possible<string>(Object.keys(lastTowers).find((lastId) => lastId === id));
				if (lastTower.exists) continue;

				const clientTower = createClientTower(tower.type, id, tower.cframe);
				this.addTower(clientTower);
			}

			for (const [id, _] of pairs(lastTowers)) {
				const tower = possible<string>(Object.keys(towers).find((towerId) => towerId === id));
				if (tower.exists) continue;

				this.destroyClientTowerFromId(id);
			}
		});
	}
}
