import { EnemyType } from "shared/modules/enemy/enemy-type";
import { EnemyModel } from "../client-enemy";
import { ReplicatedStorage } from "@rbxts/services";
import { DeepReadonly } from "@rbxts/reflex";

const enemyModels = ReplicatedStorage.assets.enemies;

const enemyTypeToModelMap = {
	ZOMBIE: enemyModels.zombie,
	ZOMBIE_SWORDER: enemyModels.zombie_sworder,
} as const satisfies DeepReadonly<Record<EnemyType, EnemyModel>>;

export function getEnemyModelFromType<T extends EnemyType>(enemyType: T): (typeof enemyTypeToModelMap)[T] {
	return enemyTypeToModelMap[enemyType].Clone() as (typeof enemyTypeToModelMap)[T];
}
