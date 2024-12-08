import { component } from "@rbxts/matter";

export const enemyComponent = component<{
	health: number;
	path: number;
	pathProgress: number;
	speed: number;
}>();

export const modelComponent = component<{
	model: Model;
}>();
