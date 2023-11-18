import { Service } from "@flamework/core";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { DamageDealtInfo, GenericTower } from "server/modules/tower/tower";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { Events } from "server/network";
import { store } from "server/store";
import { Enemy, getClientEnemies, getClosestEnemyToTower, getEnemies } from "server/store/enemy";

const TIMESTAMP_BETWEEN_CLIENT_ENEMY_SYNC = 100;

export function getCurrentTimeInMilliseconds(): number {
	return DateTime.now().UnixTimestampMillis;
}

@Service({})
export class EnemyService {
	private lastClientEnemySyncTimestamp: number;

	constructor() {
		this.lastClientEnemySyncTimestamp = getCurrentTimeInMilliseconds();
	}

	private addEnemy(enemy: Enemy): void {
		store.addEnemy(enemy);
		Events.createEnemy.broadcast(enemy.type, enemy.id, enemy.path[0].waypointAttachment.WorldCFrame);
	}

	dealDamageToClosestEnemyInRange(tower: GenericTower, { damage }: DamageDealtInfo): void {
		const possibleClosestEnemyToTower = store.getState(getClosestEnemyToTower(tower));
		if (!possibleClosestEnemyToTower.exists) return;

		const closestEnemyToTower = possibleClosestEnemyToTower.value;
		store.dealDamageToEnemy(closestEnemyToTower.id, damage);

		Events.towerAttack.broadcast(tower.getId(), closestEnemyToTower.cframe.Position);
	}

	async start(path: PathWaypoint[]) {
		store.subscribe(getEnemies, (current, previous) => {
			previous.forEach((enemy) => {
				const id = enemy.id;

				const currentEnemy = current.find((currentEnemy) => currentEnemy.id === id);
				if (!currentEnemy) {
					Events.destroyEnemy.broadcast(id);
				}
			});
		});

		task.wait(5);

		// for (let i = 0; i < 10000; i++) {
		// 	task.wait(0.5);

		// 	const ninja = createEnemy("NINJA", path);
		// 	this.addEnemy(ninja);
		// }

		const ninja = createEnemy("NINJA", path);
		this.addEnemy(ninja);
	}

	tick() {
		store.enemyTick();

		const currentTimeInMilliseconds = getCurrentTimeInMilliseconds();
		if (currentTimeInMilliseconds - this.lastClientEnemySyncTimestamp < TIMESTAMP_BETWEEN_CLIENT_ENEMY_SYNC) return;
		this.lastClientEnemySyncTimestamp = currentTimeInMilliseconds;

		const clientEnemies = store.getState(getClientEnemies);

		Events.updateEnemies.broadcast(clientEnemies);
	}
}
