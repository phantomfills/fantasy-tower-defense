import { createProducer } from "@rbxts/reflex";
import { AttackingEnemyType, NonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { PathWaypoint } from "shared/modules/map/path-waypoint";
import { getPathLength } from "shared/modules/utils/path-utils";

interface Pause {
	startTime: number;
	pauseFor: number;
}

type BaseEnemyProps = {
	path: PathWaypoint[];
	health: number;
	spawnTimestamp: number;
	pathCompletionAlpha: number;
	initialPathCompletionAlpha?: number;
	pauses: Pause[];
	dead: boolean;
};

export type NonAttackingEnemy = BaseEnemyProps & {
	enemyType: NonAttackingEnemyType;
};

export type AttackingEnemy = BaseEnemyProps & {
	enemyType: AttackingEnemyType;
};

export type Enemy = NonAttackingEnemy | AttackingEnemy;

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

			// Merge overlapping pauses
			const mergedPauses = enemy.pauses
				.sort((a, b) => a.startTime < b.startTime)
				.reduce((merged, pause) => {
					if (
						merged.size() === 0 ||
						merged[merged.size() - 1].startTime + merged[merged.size() - 1].pauseFor < pause.startTime
					) {
						merged.push(pause);
					} else {
						merged[merged.size() - 1].pauseFor = math.max(
							merged[merged.size() - 1].pauseFor,
							pause.startTime + pause.pauseFor - merged[merged.size() - 1].startTime,
						);
					}
					return merged;
				}, [] as Pause[]);

			// Calculate the total time the enemy has spent pausing
			const totalPauseTimeServed = mergedPauses
				.map((pause) => {
					const pauseEndTime = pause.startTime + pause.pauseFor;
					if (currentTimeInMilliseconds < pause.startTime) {
						// The pause hasn't started yet
						return 0;
					} else if (currentTimeInMilliseconds < pauseEndTime) {
						// The pause is in progress
						return currentTimeInMilliseconds - pause.startTime;
					} else {
						// The pause has finished
						return pause.pauseFor;
					}
				})
				.reduce((total, pauseTimeServed) => total + pauseTimeServed, 0);

			const adjustedMillisecondsSinceSpawn = millisecondsSinceSpawn - totalPauseTimeServed;

			const pathLength = getPathLength(enemy.path);
			const totalMillisecondsToCompletePath = (pathLength / enemyStats.speed) * 1000;

			const initialPathCompletionAlpha = enemy.initialPathCompletionAlpha ?? 0;
			const pathCompletionAlpha = math.clamp(
				adjustedMillisecondsSinceSpawn / totalMillisecondsToCompletePath + initialPathCompletionAlpha,
				0,
				1,
			);

			if (pathCompletionAlpha >= 1) continue;

			updatedState[id] = { ...enemy, pathCompletionAlpha };
		}

		return updatedState;
	},

	addPause: (state, enemyIdToPause: string, pause: Pause) => {
		const updatedState: EnemyState = {};

		for (const [id, enemy] of pairs(state)) {
			if (id === enemyIdToPause) {
				const updatedPauses = [...enemy.pauses, pause];
				updatedState[id] = { ...enemy, pauses: updatedPauses };
				continue;
			}

			updatedState[id] = enemy;
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
