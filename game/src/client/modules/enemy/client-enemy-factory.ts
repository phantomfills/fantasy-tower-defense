import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ClientEnemy, EnemyModel } from "./client-enemy";
import { ClientTrainingDummy } from "./client-training-dummy";
import { ClientArmoredDummy } from "./client-armored-dummy";
import { ClientSpeedsterDummy } from "./client-speedster-dummy";
import { ClientStealthDummy } from "./client-stealth-dummy";
import { ClientDummyTank } from "./client-dummy-tank";
import { ClientGuardDummy } from "./client-guard-dummy";
import { ClientMultiplierDummy } from "./client-multiplier-dummy";
import { ClientDividedDummy } from "./client-divided-dummy";
import { ClientImpostor } from "./client-impostor";
import { ClientCriticalSportsCar } from "./client-critical-sports-car";
import { ClientKorbloxDeathspeaker } from "./client-korblox-deathspeaker";
import { ClientCircuitBreaker } from "./client-circuit-breaker";

export function createClientEnemy(enemyType: EnemyType, id: string, cframe: CFrame): ClientEnemy<EnemyModel> {
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
		case "MULTIPLIER_DUMMY": {
			return new ClientMultiplierDummy(id, cframe);
		}
		case "DIVIDED_DUMMY": {
			return new ClientDividedDummy(id, cframe);
		}
		case "IMPOSTOR": {
			return new ClientImpostor(id, cframe);
		}
		case "CRITICAL_SPORTS_CAR": {
			return new ClientCriticalSportsCar(id, cframe);
		}
		case "KORBLOX_DEATHSPEAKER": {
			return new ClientKorbloxDeathspeaker(id, cframe);
		}
		case "CIRCUIT_BREAKER": {
			return new ClientCircuitBreaker(id, cframe);
		}
	}
}
