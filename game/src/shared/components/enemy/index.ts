import { component } from "@rbxts/matter";
import { EnemyModel } from "shared/constants/enemy";
import { EnemyType } from "shared/modules/enemy/enemy-type";

export interface Enemy {
	enemyType: EnemyType;
}

export const enemyComponent = component<Enemy>();

export const enemyModelComponent = component<{
	model: EnemyModel;
}>();
