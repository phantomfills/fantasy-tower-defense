import Object from "@rbxts/object-utils";
import { createProducer } from "@rbxts/reflex";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { getPathLength } from "shared/modules/utils/path-utils";

export interface Enemy {
	enemyType: EnemyType;
	path: PathWaypoint[];
	health: number;
	spawnTimestamp: number;
	pathCompletionAlpha: number;
	initialPathCompletionAlpha?: number;
	dead: boolean;
}

export type EnemyState = Record<string, Enemy>;

const initialState: EnemyState = {};

export const enemySlice = createProducer(initialState, {
	addEnemy: (state, enemyToAdd: Enemy, id: string) => ({ ...state, [id]: enemyToAdd }),

	removeEnemy: (state, enemyIdToRemove: string) => {
		const updatedState: EnemyState = {};

		for (const [id, enemy] of pairs(state)) {
			if (id === enemyIdToRemove) continue;

			updatedState[id] = enemy;
		}

		return updatedState;
	},

	dealDamageToEnemy: (state, enemyIdToDamage: string, damage: number) => {
		const updatedState: EnemyState = {};

		for (const [id, enemy] of pairs(state)) {
			if (id === enemyIdToDamage) {
				const updatedEnemyHealth = enemy.health - damage;
				if (updatedEnemyHealth <= 0) {
					updatedState[id] = { ...enemy, health: 0, dead: true };
					continue;
				}

				updatedState[id] = { ...enemy, health: updatedEnemyHealth };
				continue;
			}

			updatedState[id] = enemy;
		}

		return updatedState;
	},

	enemyTick: (state, currentTimeInMilliseconds: number) => {
		const updatedState: EnemyState = {};

		for (const [id, enemy] of pairs(state)) {
			const enemyStats = describeEnemyFromType(enemy.enemyType);

			const millisecondsSinceSpawn = currentTimeInMilliseconds - enemy.spawnTimestamp;

			const pathLength = getPathLength(enemy.path);
			const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

			const initialPathCompletionAlpha = enemy.initialPathCompletionAlpha ?? 0;
			const pathCompletionAlpha = math.clamp(
				millisecondsSinceSpawn / totalMillisecondsToCompletePath + initialPathCompletionAlpha,
				0,
				1,
			);

			if (pathCompletionAlpha >= 1) continue;

			updatedState[id] = { ...enemy, pathCompletionAlpha };
		}

		return updatedState;
	},

	clearEnemies: (state) => {
		const updatedState: EnemyState = {};

		for (const [id, enemy] of pairs(state)) {
			updatedState[id] = { ...enemy, health: 0, dead: true };
		}

		return updatedState;
	},
});
