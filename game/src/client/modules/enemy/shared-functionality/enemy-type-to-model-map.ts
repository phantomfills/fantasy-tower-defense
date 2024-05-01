import { EnemyType } from "shared/modules/enemy/enemy-type";
import { EnemyModel } from "../client-enemy";
import { ReplicatedStorage } from "@rbxts/services";

const enemyModels = ReplicatedStorage.assets.enemies.models;

const ENEMY_MODELS = {
	TRAINING_DUMMY: enemyModels.trainingDummy,
	SPEEDSTER_DUMMY: enemyModels.speedsterDummy,
	ARMORED_DUMMY: enemyModels.armoredDummy,
	STEALTH_DUMMY: enemyModels.stealthDummy,
	MULTIPLIER_DUMMY: enemyModels.multiplierDummy,
	DIVIDED_DUMMY: enemyModels.dividedDummy,
	GUARD_DUMMY: enemyModels.guardDummy,
	DUMMY_TANK: enemyModels.dummyTank,
	KORBLOX_DEATHSPEAKER: enemyModels.korblox_deathspeaker,
	CRITICAL_SPORTS_CAR: enemyModels.critical_sports_car,
	CIRCUIT_BREAKER: enemyModels.circuit_breaker,
	IMPOSTOR: enemyModels.impostor,
} as const satisfies Readonly<Record<EnemyType, EnemyModel>>;

export function getEnemyModelFromType<T extends EnemyType>(enemyType: T): (typeof ENEMY_MODELS)[T] {
	return ENEMY_MODELS[enemyType];
}
