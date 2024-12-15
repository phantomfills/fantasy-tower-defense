import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy } from "./client-enemy";
import { EnemyModel } from "shared/constants/enemy";
import { ClientZombie } from "./client-zombie";
import { ClientZombieSworder } from "./client-zombie-sworder";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy<EnemyModel> {
	switch (enemyType) {
		case "ZOMBIE": {
			return new ClientZombie(id, cframe);
		}
		case "ZOMBIE_SWORDER": {
			return new ClientZombieSworder(id, cframe);
		}
	}
}
