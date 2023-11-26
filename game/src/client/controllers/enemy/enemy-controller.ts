import { Controller, OnStart, OnTick } from "@flamework/core";
import { ClientEnemy } from "client/modules/enemy/client-enemy";
import { createClientEnemy } from "client/modules/enemy/client-enemy-factory";
import { store } from "client/store";
import { Possible, possible } from "shared/modules/util/possible";
import { ClientEnemyInfo, POSITION_PRECISION_MULTIPLIER } from "shared/network";
import { Enemy, getEnemies } from "shared/store/enemy";

@Controller({})
export class EnemyController implements OnStart, OnTick {
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
		store.subscribe(getEnemies, (enemies, lastEnemies) => {
			enemies.forEach((enemy) => {
				const id = enemy.id;
				const enemyLastUpdate = lastEnemies.find((lastEnemy) => lastEnemy.id === id);

				if (!enemyLastUpdate) {
					const clientEnemy = createClientEnemy(enemy.type, enemy.id, enemy.cframe);
					this.addEnemy(clientEnemy);
				}

				const possibleClientEnemy = this.getClientEnemyFromId(enemy.id);
				if (!possibleClientEnemy.exists) return;

				const clientEnemy = possibleClientEnemy.value;

				this.updateEnemyByAnimation(clientEnemy, {
					id: enemy.id,
					position: new Vector3int16(
						enemy.cframe.Position.X * POSITION_PRECISION_MULTIPLIER,
						enemy.cframe.Position.Y * POSITION_PRECISION_MULTIPLIER,
						enemy.cframe.Position.Z * POSITION_PRECISION_MULTIPLIER,
					),
					rotation: enemy.cframe.Rotation,
				});
			});

			lastEnemies.forEach((lastEnemy) => {
				const id = lastEnemy.id;
				if (!enemies.find((enemy) => enemy.id === id)) {
					this.destroyEnemyFromId(id);
				}
			});
		});
	}

	onTick() {}
}
