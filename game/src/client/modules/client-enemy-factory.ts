import { EnemyType } from "shared/modules/enemy-type";
import { ClientEnemy, EnemyModel, GenericClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

interface CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string): GenericClientEnemy;
}

export class ClientEnemyFactory implements CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string) {
		print("Creating client enemy...");
		let clientEnemyModelTemplate: EnemyModel;

		switch (enemyType) {
			case "NINJA": {
				clientEnemyModelTemplate = ReplicatedStorage.assets.enemies.foo.models.foo;
			}
		}

		const clientEnemyModel = clientEnemyModelTemplate.Clone();
		clientEnemyModel.Parent = Workspace;
		return new ClientEnemy(clientEnemyModel, id);
	}
}
