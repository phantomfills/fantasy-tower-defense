import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy } from "./client-enemy";
import { ClientTrainingDummy } from "./client-training-dummy";
import { ClientArmoredDummy } from "./client-armored-dummy";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy {
	switch (enemyType) {
		case "TRAINING_DUMMY": {
			return new ClientTrainingDummy(id, cframe);
		}
		case "ARMORED_DUMMY": {
			return new ClientArmoredDummy(id, cframe);
		}
	}
}
