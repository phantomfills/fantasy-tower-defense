import { createProducer } from "@rbxts/reflex";
import { AttackingEnemyType, NonAttackingEnemyType } from "shared/modules/enemy/enemy-type";

export interface Pause {
	startTime: number;
	pauseFor: number;
}

type BaseEnemyProps = {
	health: number;
	spawnTimestamp: number;
	initialPathCompletionAlpha?: number;
	pauses: Pause[];
	dead: boolean;
	path: number;
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
