import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";

@Controller({})
export class EnemyController implements OnStart {
	private clientEnemies: ClientEnemy[];

	constructor() {
		this.clientEnemies = [];
	}

	onStart() {}
}
