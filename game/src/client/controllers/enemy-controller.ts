import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";
import { ClientEnemyFactory } from "client/modules/client-enemy-factory";
import { Events } from "client/network";
import { Workspace } from "@rbxts/services";
import { possible } from "shared/modules/possible";
import { ClientEnemyInfo } from "shared/network";

const getPositionIsOnScreen = (position: Vector3, margin: number) => {
	const possibleCamera = possible(Workspace.CurrentCamera);
	if (!possibleCamera.exists) return;

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

	updateEnemy(enemyInfo: ClientEnemyInfo) {
		const clientEnemy = this.clientEnemies.find((clientEnemy: ClientEnemy) => {
			return clientEnemy.getId() === enemyInfo.id;
		});
		if (!clientEnemy) return;

		const position = new Vector3(
			enemyInfo.position.X / 100,
			enemyInfo.position.Y / 100,
			enemyInfo.position.Z / 100,
		);
		const onScreen = getPositionIsOnScreen(position, 100);
		if (!onScreen) {
			clientEnemy.setRenderedLastFrame(false);
			return;
		}

		const renderedLastFrame = clientEnemy.getRenderedLastFrame();
		clientEnemy.setRenderedLastFrame(true);

		const cframe = new CFrame(position).mul(enemyInfo.rotation);

		if (!renderedLastFrame) {
			clientEnemy.setCFrame(cframe);
			return;
		}

		clientEnemy.setTargetCFrame(cframe);
	}

	onStart() {
		Events.createEnemy.connect((enemyType, id, cframe) => {
			const clientEnemyFactory = new ClientEnemyFactory();
			const clientEnemy = clientEnemyFactory.createClientEnemy(enemyType, id, cframe);
			this.addEnemy(clientEnemy);
		});

		Events.updateEnemy.connect((enemyInfo) => {
			this.updateEnemy(enemyInfo);
		});

		Events.updateEnemies.connect((enemies) => {
			enemies.forEach((enemyInfo) => {
				this.updateEnemy(enemyInfo);
			});
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
