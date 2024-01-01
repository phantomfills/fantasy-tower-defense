import { Controller, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ClientEnemy } from "client/modules/enemy/client-enemy";
import { createClientEnemy } from "client/modules/enemy/client-enemy-factory";
import { producer } from "client/store";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { Possible, possible } from "shared/modules/utils/possible";
import { getEnemies } from "shared/store/enemy";

@Controller({})
export class EnemyController implements OnStart {
	private clientEnemies: ClientEnemy[];

	constructor() {
		this.clientEnemies = [];
	}

	private addEnemy(enemy: ClientEnemy) {
		this.clientEnemies.push(enemy);
	}

	private removeEnemy(enemy: ClientEnemy) {
		const index = this.clientEnemies.indexOf(enemy);
		this.clientEnemies.remove(index);
	}

	private updateEnemyByAnimation(clientEnemy: ClientEnemy, path: PathWaypoint[], pathCompletionAlpha: number) {
		const cframe = getCFrameFromPathCompletionAlpha(path, pathCompletionAlpha);
		clientEnemy.setTargetCFrame(cframe);
	}

	getClientEnemyFromId(id: string): Possible<ClientEnemy> {
		const possibleClientEnemy = possible<ClientEnemy>(
			this.clientEnemies.find((clientEnemy: ClientEnemy) => {
				return clientEnemy.getId() === id;
			}),
		);

		return possibleClientEnemy;
	}

	private destroyEnemyFromId(id: string) {
		const possibleClientEnemy = this.getClientEnemyFromId(id);
		if (!possibleClientEnemy.exists) return;

		const clientEnemy = possibleClientEnemy.value;
		clientEnemy.destroy();
		this.removeEnemy(clientEnemy);
	}

	onStart() {
		producer.subscribe(getEnemies, (enemies, lastEnemies) => {
			for (const [id, enemy] of pairs(enemies)) {
				const enemyLastUpdate = possible<string>(
					Object.keys(lastEnemies).find((lastEnemyId) => lastEnemyId === id),
				);
				if (!enemyLastUpdate.exists) {
					const clientEnemy = createClientEnemy(
						enemy.type,
						id,
						getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha),
					);
					this.addEnemy(clientEnemy);
				}
				const possibleClientEnemy = this.getClientEnemyFromId(id);
				if (!possibleClientEnemy.exists) return;
				const clientEnemy = possibleClientEnemy.value;
				this.updateEnemyByAnimation(clientEnemy, enemy.path, enemy.pathCompletionAlpha);
			}
			for (const [id, _] of pairs(lastEnemies)) {
				const currentEnemyId = possible<string>(Object.keys(enemies).find((enemyId) => enemyId === id));
				if (!currentEnemyId.exists) {
					this.destroyEnemyFromId(id);
				}
			}
		});
	}
}
