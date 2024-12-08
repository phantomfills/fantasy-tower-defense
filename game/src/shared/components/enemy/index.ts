import { component } from "@rbxts/matter";
import { EnemyType } from "shared/modules/enemy/enemy-type";

export const enemyComponent = component<{
	health: number;
	path: number;
	pathProgress: number;
	speed: number;
	enemyType: EnemyType;
}>();
