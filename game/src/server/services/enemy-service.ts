import { Service } from "@flamework/core";
import { GenericEnemy } from "server/modules/enemy";
import { PathWaypoint } from "shared/modules/path-waypoint";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Possible } from "shared/modules/possible";
import { EnemyFactory } from "server/modules/enemy-factory";
import { Events } from "server/network";

@Service({})
export class EnemyService {
	private enemies: GenericEnemy[];
	private lastTimeClientEnemiesSentMilliseconds: number;
	private readonly timeBetweenClientEnemiesSendMilliseconds: number;

	constructor() {
		this.lastTimeClientEnemiesSentMilliseconds = this.getCurrentTimeInMilliseconds();
		this.timeBetweenClientEnemiesSendMilliseconds = 125;
		this.enemies = [];
	}

	private getCurrentTimeInMilliseconds() {
		return DateTime.now().UnixTimestampMillis;
	}

	private addEnemy(enemy: GenericEnemy) {
		this.enemies.push(enemy);
		Events.createEnemy.broadcast(enemy.getEnemyType(), enemy.getId(), enemy.getPath()[0]);

		enemy.onDeath.Connect(() => {
			this.enemies = this.enemies.filter((currentEnemy) => {
				return enemy.getId() !== currentEnemy.getId();
			});
			Events.destroyEnemy.broadcast(enemy.getId());
		});
	}

	dealDamageToClosestEnemyInRange(tower: GenericTower, info: DamageDealtInfo) {
		const closestEnemyToTower = this.getClosestEnemyToTowerInRange(tower);
		if (!closestEnemyToTower.exists) return;

		closestEnemyToTower.value.takeDamage(info.damage);
		tower.pointTowardsEnemy(closestEnemyToTower.value);
	}

	private getClosestEnemyToTowerInRange(tower: GenericTower): Possible<GenericEnemy> {
		const cframe = tower.getStat("cframe");
		const position = cframe.Position;

		const enemies = this.enemies.filter((enemy) => {
			const cframe = enemy.getCFrame();
			const position = cframe.Position;

			return tower.getPositionInRange(position);
		});

		if (enemies.isEmpty())
			return {
				exists: false,
			};

		const enemiesSortedByDistanceFromTower = enemies.sort((last, current) => {
			const lastPosition = last.getCFrame().Position;
			const distanceToLast = position.sub(lastPosition).Magnitude;

			const currentPosition = current.getCFrame().Position;
			const distanceToCurrent = position.sub(currentPosition).Magnitude;

			return distanceToLast < distanceToCurrent;
		});

		return {
			exists: true,
			value: enemiesSortedByDistanceFromTower[0],
		};
	}

	async start(path: PathWaypoint[]) {
		const enemyFactory = new EnemyFactory();

		task.wait(5);

		for (let i = 0; i < 10000; i++) {
			task.wait(0.3);

			const ninja = enemyFactory.createEnemy("NINJA", path);
			this.addEnemy(ninja);
		}
	}

	tick() {
		const currentTimeInMilliseconds = this.getCurrentTimeInMilliseconds();
		if (
			currentTimeInMilliseconds - this.lastTimeClientEnemiesSentMilliseconds <
			this.timeBetweenClientEnemiesSendMilliseconds
		)
			return;
		this.lastTimeClientEnemiesSentMilliseconds = currentTimeInMilliseconds;

		const clientEnemies = this.enemies.map((enemy) => {
			return {
				id: enemy.getId(),
				lastPathWaypoint: enemy.getLastPathWaypoint(),
				nextPathWaypoint: enemy.getNextPathWaypoint(),
				waypointAlpha: enemy.getWaypointAlpha(),
			};
		});

		Events.updateEnemies.broadcast(clientEnemies);
	}
}
