import { EnemyType } from "shared/modules/enemy-type";
import { ClientEnemy, EnemyModel, GenericClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Animatable } from "shared/modules/animatable";
import { ClientNinja } from "./client-ninja";

interface CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): GenericClientEnemy;
}

export class ClientEnemyFactory implements CreateClientEnemy {
	createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame) {
		switch (enemyType) {
			case "NINJA": {
				return new ClientNinja(cframe);
			}
		}
	}
}
