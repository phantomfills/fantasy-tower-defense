import { createProducer } from "@rbxts/reflex";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { getEnemyStatsFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { getPathLength } from "shared/modules/util/path-utils";

export interface Enemy {
	type: EnemyType;
	path: PathWaypoint[];
	health: number;
	spawnTimestamp: number;
	pathCompletionAlpha: number;
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
				print(enemy.health, damage);

				const updatedEnemyHealth = enemy.health - damage;
				if (updatedEnemyHealth <= 0) {
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
			const enemyStats = getEnemyStatsFromType(enemy.type);

			const millisecondsSinceSpawn = currentTimeInMilliseconds - enemy.spawnTimestamp;

			const pathLength = getPathLength(enemy.path);
			const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

			const pathCompletionAlpha = math.clamp(millisecondsSinceSpawn / totalMillisecondsToCompletePath, 0, 1);

			if (pathCompletionAlpha >= 1) continue;

			updatedState[id] = { ...enemy, pathCompletionAlpha };
		}

		return updatedState;
	},
});
