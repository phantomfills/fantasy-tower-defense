import { Controller, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ClientDummyTank } from "client/modules/enemy/client-dummy-tank";
import { ClientEnemy, EnemyModel } from "client/modules/enemy/client-enemy";
import { createClientEnemy } from "client/modules/enemy/client-enemy-factory";
import { Events } from "client/network";
import { producer } from "client/store";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { Possible, possible } from "shared/modules/utils/possible";
import { selectEnemies } from "shared/store/enemy";
import { selectTowerPosition } from "shared/store/tower";

@Controller({})
export class EnemyController implements OnStart {
	private clientEnemies: ClientEnemy<EnemyModel>[];

	constructor() {
		this.clientEnemies = [];
	}

	private addEnemy(enemy: ClientEnemy<EnemyModel>) {
		this.clientEnemies.push(enemy);
	}

	private removeEnemy(enemy: ClientEnemy<EnemyModel>) {
		const index = this.clientEnemies.indexOf(enemy);
		this.clientEnemies.remove(index);
	}

	private updateEnemyByAnimation(
		clientEnemy: ClientEnemy<EnemyModel>,
		path: PathWaypoint[],
		pathCompletionAlpha: number,
	) {
		const cframe = getCFrameFromPathCompletionAlpha(path, pathCompletionAlpha);
		clientEnemy.setTargetCFrame(cframe);
	}

	getClientEnemyFromId(id: string): Possible<ClientEnemy<EnemyModel>> {
		const possibleClientEnemy = possible<ClientEnemy<EnemyModel>>(
			this.clientEnemies.find((clientEnemy) => {
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
		Events.enemyAttack.connect((attack) => {
			const { towerId, enemyId, attackType } = attack;

			const possibleClientEnemy = this.getClientEnemyFromId(enemyId);
			if (!possibleClientEnemy.exists) return;

			const clientEnemy = possibleClientEnemy.value;

			const possibleTowerPosition = producer.getState(selectTowerPosition(towerId));
			if (!possibleTowerPosition.exists) return;

			const towerPosition = possibleTowerPosition.value;

			switch (attackType) {
				case "BOULDER_THROW": {
					if (!(clientEnemy instanceof ClientDummyTank)) return;
					clientEnemy.throwBoulder(towerPosition);
				}
			}
		});

		producer.subscribe(selectEnemies, (enemies, lastEnemies) => {
			for (const [id, enemy] of pairs(enemies)) {
				const enemyLastUpdate = possible<string>(
					Object.keys(lastEnemies).find((lastEnemyId) => lastEnemyId === id),
				);
				if (!enemyLastUpdate.exists) {
					const clientEnemy = createClientEnemy(
						enemy.enemyType,
						id,
						getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha),
					);
					clientEnemy.start();
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
