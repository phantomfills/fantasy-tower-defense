import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";
import { createClientEnemy } from "client/modules/client-enemy-factory";
import { Events } from "client/network";
import { Possible, possible } from "shared/modules/possible";
import { ClientEnemyInfo, POSITION_PRECISION_MULTIPLIER } from "shared/network";

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

	private getPositionFromEnemyInfo(enemyInfo: ClientEnemyInfo) {
		return new Vector3(
			enemyInfo.position.X / POSITION_PRECISION_MULTIPLIER,
			enemyInfo.position.Y / POSITION_PRECISION_MULTIPLIER,
			enemyInfo.position.Z / POSITION_PRECISION_MULTIPLIER,
		);
	}

	private getCFrameWithRotationFromEnemyInfo(enemyInfo: ClientEnemyInfo) {
		const position = this.getPositionFromEnemyInfo(enemyInfo);
		return new CFrame(position).mul(enemyInfo.rotation);
	}

	private updateEnemyByAnimation(clientEnemy: ClientEnemy, enemyInfo: ClientEnemyInfo) {
		const cframe = this.getCFrameWithRotationFromEnemyInfo(enemyInfo);
		clientEnemy.setTargetCFrame(cframe);
	}

	private updateEnemy(enemyInfo: ClientEnemyInfo) {
		const possibleClientEnemy = this.getClientEnemyFromId(enemyInfo.id);
		if (!possibleClientEnemy.exists) return;

		const clientEnemy = possibleClientEnemy.value;
		this.updateEnemyByAnimation(clientEnemy, enemyInfo);
	}

	private tryUpdateEnemy(enemyInfo: ClientEnemyInfo) {
		try {
			this.updateEnemy(enemyInfo);
		} catch (error) {
			warn(error);
		}
	}

	private getClientEnemyFromId(id: string): Possible<ClientEnemy> {
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
		Events.createEnemy.connect((enemyType, id, cframe) => {
			const clientEnemy = createClientEnemy(enemyType, id, cframe);
			this.addEnemy(clientEnemy);
		});

		Events.updateEnemy.connect((enemyInfo) => this.tryUpdateEnemy(enemyInfo));
		Events.updateEnemies.connect((enemies) => {
			enemies.forEach((enemyInfo) => this.tryUpdateEnemy(enemyInfo));
		});

		Events.destroyEnemy.connect((id) => this.destroyEnemyFromId(id));
	}
}
