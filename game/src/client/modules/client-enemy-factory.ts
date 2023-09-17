import { EnemyType } from "shared/modules/enemy-type";
import { ClientEnemy, EnemyModel, GenericClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Animatable } from "shared/modules/animatable";

interface CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): GenericClientEnemy;
}

export class ClientEnemyFactory implements CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame) {
		let clientEnemyModelTemplate: EnemyModel & Animatable;

		switch (enemyType) {
			case "NINJA": {
				clientEnemyModelTemplate = ReplicatedStorage.assets.enemies.foo.models.foo;
			}
		}

		const clientEnemyModel = clientEnemyModelTemplate.Clone();
		clientEnemyModel.Parent = Workspace;
		return new ClientEnemy(clientEnemyModel, id, cframe);
	}
}
