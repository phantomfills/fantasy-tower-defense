import { EnemyType } from "shared/modules/enemy-type";
import { ClientEnemy, EnemyModel, GenericClientEnemy } from "./client-enemy";
import { ReplicatedStorage } from "@rbxts/services";

interface CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string): GenericClientEnemy;
}

export class ClientEnemyFactory implements CreateClientEnemy {
	createClientEnemy(enemyType: "NINJA", id: string) {
		let clientEnemyModel: EnemyModel;

		switch (enemyType) {
			case "NINJA": {
				clientEnemyModel = ReplicatedStorage.assets.enemies.foo.models.foo;
			}
		}

		return new ClientEnemy(clientEnemyModel);
	}
}
