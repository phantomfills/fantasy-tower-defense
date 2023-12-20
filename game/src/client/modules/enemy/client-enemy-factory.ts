import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy } from "./client-enemy";
import { ClientWeakDummy } from "./client-weak-dummy";
import { ClientStrongDummy } from "./client-strong-dummy";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy {
	switch (enemyType) {
		case "WEAK_DUMMY": {
			return new ClientWeakDummy(id, cframe);
		}
		case "STRONG_DUMMY": {
			return new ClientStrongDummy(id, cframe);
		}
	}
}
