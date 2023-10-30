import { createProducer } from "@rbxts/reflex";
import { GenericEnemy } from "server/modules/enemy/enemy";

export type EnemyState = GenericEnemy[];

const initialState: EnemyState = [];

export const enemySlice = createProducer(initialState, {
	addEnemy: (state, enemyToAdd: GenericEnemy) => [...state, enemyToAdd],

	removeEnemyFromId: (state, enemyIdToRemove: string) => state.filter((enemy) => enemy.getId() !== enemyIdToRemove),
});
