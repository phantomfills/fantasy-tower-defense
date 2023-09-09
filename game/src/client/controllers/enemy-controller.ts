import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";
import { ClientEnemyFactory } from "client/modules/client-enemy-factory";
import { Events } from "client/network";

@Controller({})
export class EnemyController implements OnStart {
	private clientEnemies: ClientEnemy[];

	constructor() {
		this.clientEnemies = [];
	}

	addEnemy(enemy: ClientEnemy) {
		this.clientEnemies.push(enemy);
	}

	removeEnemy(enemy: ClientEnemy) {
		const index = this.clientEnemies.indexOf(enemy);
		this.clientEnemies.remove(index);
	}

	onStart() {
		Events.createEnemy.connect((enemyType, id) => {
			const clientEnemyFactory = new ClientEnemyFactory();
			const clientEnemy = clientEnemyFactory.createClientEnemy(enemyType, id);
			this.addEnemy(clientEnemy);
		});

		Events.updateEnemy.connect((id, clientInfo) => {
			const clientEnemy = this.clientEnemies.find((clientEnemy: ClientEnemy) => {
				return clientEnemy.getId() === id;
			});
			if (!clientEnemy) return;
			clientEnemy.setTargetCFrame(clientInfo.cframe.mul(clientInfo.rotation));
		});

		Events.destroyEnemy.connect((id) => {
			const clientEnemy = this.clientEnemies.find((clientEnemy: ClientEnemy) => {
				return clientEnemy.getId() === id;
			});
			if (!clientEnemy) return;
			clientEnemy.destroy();
			this.removeEnemy(clientEnemy);
		});
	}
}