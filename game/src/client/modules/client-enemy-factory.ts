import { EnemyType } from "shared/modules/enemy-type";
import { GenericClientEnemy } from "./client-enemy";
import { ClientNinja } from "./client-ninja";

export const createClientEnemy = (enemyType: EnemyType, id: string, cframe: CFrame): GenericClientEnemy => {
	switch (enemyType) {
		case "NINJA": {
			return new ClientNinja(id, cframe);
		}
	}
};
