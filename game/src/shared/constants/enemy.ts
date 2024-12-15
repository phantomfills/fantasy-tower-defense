import { EnemyType } from "shared/modules/enemy/enemy-type";
import { ReplicatedStorage } from "@rbxts/services";
import { DeepReadonly } from "@rbxts/reflex";

export interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

const enemyModels = ReplicatedStorage.assets.enemies;

const enemyTypeToModelMap = {
	ZOMBIE: enemyModels.zombie,
	ZOMBIE_SWORDER: enemyModels.zombie_sworder,
} as const satisfies DeepReadonly<Record<EnemyType, EnemyModel>>;

export function getEnemyModelFromType<T extends EnemyType>(enemyType: T): (typeof enemyTypeToModelMap)[T] {
	return enemyTypeToModelMap[enemyType].Clone() as (typeof enemyTypeToModelMap)[T];
}
