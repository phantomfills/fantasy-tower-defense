import { GenericClientTower } from "client/modules/tower/client-tower";
import { createClientTower } from "client/modules/tower/client-tower-factory";
import { Possible, possible } from "shared/modules/utils/possible";
import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/store";
import { Tower, getPossibleTowerLevelFromId, selectTowers } from "shared/store/tower";
import { Events } from "client/network";
import { EnemyController } from "../enemy/enemy-controller";

function getTowerId(_: Tower, id: string) {
	return id;
}

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
		producer.observe(selectTowers, getTowerId, ({ towerType, level, cframe }, id) => {
			const clientTower = createClientTower(towerType, level, id, cframe);
			this.addTower(clientTower);

			const unsubscribeLevel = producer.subscribe(getPossibleTowerLevelFromId(id), (possibleLevel) => {
				if (!possibleLevel.exists) return;

				this.destroyClientTowerFromId(id);

				const clientTower = createClientTower(towerType, possibleLevel.value, id, cframe);
				this.addTower(clientTower);
			});

			return () => {
				unsubscribeLevel();
				this.destroyClientTowerFromId(id);
			};
		});

		Events.towerAttack.connect(({ towerId, enemyPosition }) => {
			const possibleClientTower = this.getClientTowerFromId(towerId);
			if (!possibleClientTower.exists) return;

			const clientTower = possibleClientTower.value;
			clientTower.attack(enemyPosition);
		});
	}
}
