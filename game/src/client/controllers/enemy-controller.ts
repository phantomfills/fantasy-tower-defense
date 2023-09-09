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

	onStart() {
		Events.createEnemy.connect((enemyType, id) => {
			const clientEnemyFactory = new ClientEnemyFactory();
			const clientEnemy = clientEnemyFactory.createClientEnemy(enemyType, id);
			this.clientEnemies.push(clientEnemy);
		});

		// connect to the update enemy event, find the client enemy with same id and update its cframe
		Events.updateEnemy.connect((id, clientInfo) => {
			const clientEnemy = this.clientEnemies.find((clientEnemy: ClientEnemy) => {
				return clientEnemy.getId() === id;
			});
			if (!clientEnemy) return;
		});
	}
}
