import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";
import { ClientEnemyFactory } from "client/modules/client-enemy-factory";
import { Events } from "client/network";
import { Workspace } from "@rbxts/services";
import { possible } from "shared/modules/possible";
import { ClientEnemyInfo, positionPrecisionMultiplier } from "shared/network";

const getPositionIsOnScreen = (position: Vector3, margin: number): boolean => {
	const possibleCamera = possible(Workspace.CurrentCamera);
	if (!possibleCamera.exists) return false;

	const camera = possibleCamera.value;
	const viewportX = camera.ViewportSize.X + margin;
	const viewportY = camera.ViewportSize.Y + margin;
	const screenPoint = camera.WorldToScreenPoint(position)[0];
	if (
		screenPoint.X >= -margin &&
		screenPoint.X <= viewportX &&
		screenPoint.Y >= -margin &&
		screenPoint.Y <= viewportY &&
		screenPoint.Z > -margin
	)
		return true;
	return false;
};

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

	constructEnemyCFrameFromClientInfo(lastCFrame: CFrame, nextCFrame: CFrame, waypointAlpha: number) {
		const position = lastCFrame.Position.Lerp(nextCFrame.Position, waypointAlpha);

		const rotationMultiplier = 3;
		const rotationAlpha = math.min(waypointAlpha * rotationMultiplier, 1);
		const rotation = lastCFrame.Rotation.Lerp(nextCFrame.Rotation, rotationAlpha);

		return new CFrame(position).mul(rotation);
	}

	getPositionFromEnemyInfo(enemyInfo: ClientEnemyInfo) {
		return new Vector3(
			enemyInfo.position.X / positionPrecisionMultiplier,
			enemyInfo.position.Y / positionPrecisionMultiplier,
			enemyInfo.position.Z / positionPrecisionMultiplier,
		);
	}

	getCFrameWithRotationFromEnemyInfo(enemyInfo: ClientEnemyInfo) {
		const position = this.getPositionFromEnemyInfo(enemyInfo);
		return new CFrame(position).mul(enemyInfo.rotation);
	}

	updateEnemyByAnimation(clientEnemy: ClientEnemy, enemyInfo: ClientEnemyInfo) {
		const cframe = this.getCFrameWithRotationFromEnemyInfo(enemyInfo);
		clientEnemy.setTargetCFrame(cframe);
	}

	updateEnemyBySnap(clientEnemy: ClientEnemy, enemyInfo: ClientEnemyInfo) {
		const cframe = this.getCFrameWithRotationFromEnemyInfo(enemyInfo);
		clientEnemy.setCFrame(cframe);
	}

	getClientEnemyById(id: string) {
		return this.clientEnemies.find((clientEnemy: ClientEnemy) => {
			return clientEnemy.getId() === id;
		});
	}

	getEnemyOnScreenFromEnemyInfo(enemyInfo: ClientEnemyInfo) {
		const position = new Vector3(
			enemyInfo.position.X / positionPrecisionMultiplier,
			enemyInfo.position.Y / positionPrecisionMultiplier,
			enemyInfo.position.Z / positionPrecisionMultiplier,
		);

		const onScreen = getPositionIsOnScreen(position, 100);
		return onScreen;
	}

	onStart() {
		Events.createEnemy.connect((enemyType, id, cframe) => {
			const clientEnemyFactory = new ClientEnemyFactory();
			const clientEnemy = clientEnemyFactory.createClientEnemy(enemyType, id, cframe);
			this.addEnemy(clientEnemy);
		});

		const updateEnemy = (enemyInfo: ClientEnemyInfo) => {
			const possibleClientEnemy = possible(this.getClientEnemyById(enemyInfo.id));
			if (!possibleClientEnemy.exists) return;

			const clientEnemy = possibleClientEnemy.value;
			if (!this.getEnemyOnScreenFromEnemyInfo(enemyInfo)) {
				clientEnemy.setRenderedLastFrame(false);
				return;
			}

			const renderedLastFrame = clientEnemy.getRenderedLastFrame();
			if (!renderedLastFrame) {
				this.updateEnemyBySnap(clientEnemy, enemyInfo);
			} else {
				this.updateEnemyByAnimation(clientEnemy, enemyInfo);
			}

			clientEnemy.setRenderedLastFrame(true);
		};

		const tryUpdateEnemy = (enemyInfo: ClientEnemyInfo) => {
			try {
				updateEnemy(enemyInfo);
			} catch (error) {
				warn(error);
			}
		};

		Events.updateEnemy.connect(tryUpdateEnemy);
		Events.updateEnemies.connect((enemies) => {
			enemies.forEach(tryUpdateEnemy);
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
