import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy } from "./client-enemy";
import { ClientNinja } from "./client-ninja";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy {
	switch (enemyType) {
		case "NINJA": {
			return new ClientNinja(id, cframe);
		}
	}
}
