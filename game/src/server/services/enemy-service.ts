import { OnStart, OnTick, Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { GenericEnemy, PathWaypoint } from "server/modules/enemy";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Possible } from "shared/modules/possible";
import { EnemyFactory } from "server/modules/enemy-factory";
import { Events } from "server/network";

const getChildrenAs = <T>(instance: Instance) => {
	return instance.GetChildren() as T[];
};

@Service({})
export class EnemyService implements OnStart, OnTick {
	private enemies: GenericEnemy[];
	private lastTimeClientEnemiesSentMilliseconds: number;
	private readonly timeBetweenClientEnemiesSendMilliseconds: number;

	constructor() {
		this.lastTimeClientEnemiesSentMilliseconds = this.getCurrentTimeInMilliseconds();
		this.timeBetweenClientEnemiesSendMilliseconds = 100;
		this.enemies = [];
	}

	private getCurrentTimeInMilliseconds() {
		return DateTime.now().UnixTimestampMillis;
	}

	private addEnemy(enemy: GenericEnemy) {
		this.enemies.push(enemy);

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

	onStart() {
		const path = getChildrenAs<PathWaypoint>(Workspace.gameMap.path);
		path.sort((previous, current) => {
			return previous.Name < current.Name;
		});

		const enemyFactory = new EnemyFactory();

		task.wait(5);

		for (;;) {
			task.wait(0.1);

			const ninja = enemyFactory.createEnemy("NINJA", path);
			this.addEnemy(ninja);
		}
	}

	onTick() {
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
				cframe: enemy.getCFrame(),
				rotation: enemy.getRotation(),
			};
		});

		Events.updateEnemies.broadcast(clientEnemies);
	}
}
