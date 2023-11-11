import { Service } from "@flamework/core";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { DamageDealtInfo, GenericTower } from "server/modules/tower/tower";
import { Possible } from "shared/modules/util/possible";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { Events } from "server/network";
import { store } from "server/store";
import { Enemy, getClientEnemies, getEnemiesInTowerRange } from "server/store/enemy";

@Service({})
export class EnemyService {
	private lastTimeClientEnemiesSentMilliseconds: number;
	private readonly timeBetweenClientEnemiesSendMilliseconds: number;

	constructor() {
		this.lastTimeClientEnemiesSentMilliseconds = this.getCurrentTimeInMilliseconds();
		this.timeBetweenClientEnemiesSendMilliseconds = 100;
	}

	private getCurrentTimeInMilliseconds() {
		return DateTime.now().UnixTimestampMillis;
	}

	private addEnemy(enemy: Enemy) {
		store.addEnemy(enemy);
		Events.createEnemy.broadcast(enemy.type, enemy.id, enemy.path[0].waypointAttachment.WorldCFrame);
	}

	dealDamageToClosestEnemyInRange(tower: GenericTower, info: DamageDealtInfo) {
		const possibleClosestEnemyToTower = this.getClosestEnemyToTowerInRange(tower);
		if (!possibleClosestEnemyToTower.exists) return;

		const closestEnemyToTower = possibleClosestEnemyToTower.value;
		closestEnemyToTower.health -= info.damage;

		Events.towerAttack.broadcast(tower.getId(), closestEnemyToTower.cframe.Position);
	}

	private getEnemiesInTowerRange(tower: GenericTower): Enemy[] {
		const enemiesInTowerRange = store.getState(getEnemiesInTowerRange(tower));
		return enemiesInTowerRange;
	}

	private getClosestEnemyToTowerInRange(tower: GenericTower): Possible<Enemy> {
		const cframe = tower.getStat("cframe");
		const position = cframe.Position;

		const enemiesInRange = this.getEnemiesInTowerRange(tower);

		if (enemiesInRange.isEmpty())
			return {
				exists: false,
			};

		const enemiesSortedByDistanceFromTower = enemiesInRange.sort((last, current) => {
			const lastPosition = last.cframe.Position;
			const distanceToLast = position.sub(lastPosition).Magnitude;

			const currentPosition = current.cframe.Position;
			const distanceToCurrent = position.sub(currentPosition).Magnitude;

			return distanceToLast < distanceToCurrent;
		});

		return {
			exists: true,
			value: enemiesSortedByDistanceFromTower[0],
		};
	}

	async start(path: PathWaypoint[]) {
		task.wait(5);

		for (let i = 0; i < 10000; i++) {
			task.wait(0.5);

			const ninja = createEnemy("NINJA", path);
			this.addEnemy(ninja);
		}
	}

	tick() {
		store.enemyTick();

		const currentTimeInMilliseconds = this.getCurrentTimeInMilliseconds();
		if (
			currentTimeInMilliseconds - this.lastTimeClientEnemiesSentMilliseconds <
			this.timeBetweenClientEnemiesSendMilliseconds
		)
			return;
		this.lastTimeClientEnemiesSentMilliseconds = currentTimeInMilliseconds;

		const clientEnemies = store.getState(getClientEnemies);

		Events.updateEnemies.broadcast(clientEnemies);
	}
}
