import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy } from "./client-enemy";
import { ClientTrainingDummy } from "./client-training-dummy";
import { ClientArmoredDummy } from "./client-armored-dummy";
import { ClientSpeedsterDummy } from "./client-speedster-dummy";
import { ClientStealthDummy } from "./client-stealth-dummy";
import { ClientDummyTank } from "./client-dummy-tank";
import { ClientGuardDummy } from "./client-guard-dummy";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy {
	switch (enemyType) {
		case "TRAINING_DUMMY": {
			return new ClientTrainingDummy(id, cframe);
		}
		case "ARMORED_DUMMY": {
			return new ClientArmoredDummy(id, cframe);
		}
		case "SPEEDSTER_DUMMY": {
			return new ClientSpeedsterDummy(id, cframe);
		}
		case "STEALTH_DUMMY": {
			return new ClientStealthDummy(id, cframe);
		}
		case "GUARD_DUMMY": {
			return new ClientGuardDummy(id, cframe);
		}
		case "DUMMY_TANK": {
			return new ClientDummyTank(id, cframe);
		}
	}
}
