import { Controller, OnStart } from "@flamework/core";
import { ClientEnemy } from "client/modules/client-enemy";
import { ClientEnemyFactory } from "client/modules/client-enemy-factory";
import { Events } from "client/network";
import { PathWaypoint } from "shared/modules/path-waypoint";

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

	constructEnemyCFrameFromClientInfo(lastWaypoint: PathWaypoint, nextWaypoint: PathWaypoint, waypointAlpha: number) {
		const position = lastWaypoint.waypointAttachment.WorldPosition.Lerp(
			nextWaypoint.waypointAttachment.WorldPosition,
			waypointAlpha,
		);

		const rotationMultiplier = 10;
		const rotationAlpha = math.min(waypointAlpha * rotationMultiplier, 1);
		const rotation = lastWaypoint.waypointAttachment.WorldCFrame.Rotation.Lerp(
			nextWaypoint.waypointAttachment.WorldCFrame.Rotation,
			rotationAlpha,
		);

		return new CFrame(position).mul(rotation);
	}

	onStart() {
		Events.createEnemy.connect((enemyType, id, pathWaypoint) => {
			const clientEnemyFactory = new ClientEnemyFactory();
			const clientEnemy = clientEnemyFactory.createClientEnemy(
				enemyType,
				id,
				pathWaypoint.waypointAttachment.WorldCFrame,
			);
			this.addEnemy(clientEnemy);
		});

		Events.updateEnemies.connect((enemies) => {
			enemies.forEach((enemy) => {
				const clientEnemy = this.clientEnemies.find((clientEnemy: ClientEnemy) => {
					return clientEnemy.getId() === enemy.id;
				});
				if (!clientEnemy) return;

				clientEnemy.setTargetCFrame(
					this.constructEnemyCFrameFromClientInfo(
						enemy.lastPathWaypoint,
						enemy.nextPathWaypoint,
						enemy.waypointAlpha,
					),
				);
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
