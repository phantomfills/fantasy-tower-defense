import { OnStart, Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Ninja } from "../modules/ninja";
import { GenericEnemy, PathWaypoint } from "server/modules/enemy";
import { DamageDealtInfo, GenericTower } from "server/modules/tower";
import { Possible } from "shared/modules/possible";

const getChildrenAs = <T>(instance: Instance) => {
	return instance.GetChildren() as T[];
};

@Service({})
export class EnemyService implements OnStart {
	private enemies: GenericEnemy[];

	constructor() {
		this.enemies = [];
	}

	private addEnemy(enemy: GenericEnemy) {
		this.enemies.push(enemy);

		enemy.onDeath.Connect(() => {
			this.enemies = this.enemies.filter((currentEnemy) => {
				return enemy.getId() !== currentEnemy.getId();
			});
		});
	}

	dealDamageToClosestEnemy(tower: GenericTower, info: DamageDealtInfo) {
		const closestEnemyToTower = this.getClosestEnemyToTower(tower);
		if (!closestEnemyToTower.exists) return;

		closestEnemyToTower.value.takeDamage(info.damage);
		tower.pointTowardsEnemy(closestEnemyToTower.value);
	}

	private getClosestEnemyToTower(tower: GenericTower): Possible<GenericEnemy> {
		const cframe = tower.getStat("cframe");
		const position = cframe.Position;

		if (this.enemies.isEmpty())
			return {
				exists: false,
			};

		this.enemies.sort((last, current) => {
			const lastPosition = last.getCFrame().Position;
			const distanceToLast = position.sub(lastPosition).Magnitude;

			const currentPosition = current.getCFrame().Position;
			const distanceToCurrent = position.sub(currentPosition).Magnitude;

			return distanceToLast < distanceToCurrent;
		});

		return {
			exists: true,
			value: this.enemies[0],
		};
	}

	onStart() {
		const path = getChildrenAs<PathWaypoint>(Workspace.gameMap.path);
		path.sort((previous, current) => {
			return previous.Name < current.Name;
		});

		for (;;) {
			task.wait(1);

			const ninja = new Ninja(path);
			this.addEnemy(ninja);
		}
	}
}
