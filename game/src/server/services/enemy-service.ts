import { Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Ninja } from "../modules/ninja";
import { Enemy, GenericEnemy, PathWaypoint } from "server/modules/enemy";

const getChildrenAs = <T>(instance: Instance) => {
	return instance.GetChildren() as T[];
};

@Service({})
export class EnemyService {
	private enemies: GenericEnemy[];

	constructor() {
		this.enemies = [];
	}

	addEnemy(enemy: GenericEnemy) {
		this.enemies.push(enemy);

		enemy.onDeath.Connect(() => {
			this.enemies = this.enemies.filter((currentEnemy) => {
				return enemy.id !== currentEnemy.id;
			});
		});
	}

	getEnemies() {
		return this.enemies;
	}

	initiate() {
		const path = getChildrenAs<PathWaypoint>(Workspace.gameMap.path);
		path.sort((previous, current) => {
			return previous.Name < current.Name;
		});

		const ninja = new Ninja(path);
		this.addEnemy(ninja);
	}
}
