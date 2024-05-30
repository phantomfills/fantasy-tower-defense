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

export type EnemyState = {
	enemies: Record<string, Enemy | undefined>;
	enemyHealthScaleFactor: number;
};

const initialState: EnemyState = {
	enemies: {},
	enemyHealthScaleFactor: 1,
};

export const enemySlice = createProducer(initialState, {
	addEnemy: (state, enemyToAdd: Enemy, id: string) => ({ ...state, enemies: { ...state.enemies, [id]: enemyToAdd } }),

	removeEnemy: (state, enemyIdToRemove: string) => {
		const enemies: Record<string, Enemy | undefined> = {};

		for (const [id, enemy] of pairs(state.enemies)) {
			if (id === enemyIdToRemove) continue;

			enemies[id] = enemy;
		}

		return {
			...state,
			enemies,
		};
	},

	dealDamageToEnemy: (state, enemyIdToDamage: string, damage: number) => {
		const enemies: Record<string, Enemy | undefined> = {};

		for (const [id, enemy] of pairs(state.enemies)) {
			if (id === enemyIdToDamage) {
				const updatedEnemyHealth = enemy.health - damage;
				if (updatedEnemyHealth <= 0) {
					enemies[id] = { ...enemy, health: 0, dead: true };
					continue;
				}

				enemies[id] = { ...enemy, health: updatedEnemyHealth };
				continue;
			}

			enemies[id] = enemy;
		}

		return {
			...state,
			enemies,
		};
	},

	addPause: (state, enemyIdToPause: string, pause: Pause) => {
		const enemies: Record<string, Enemy | undefined> = {};

		for (const [id, enemy] of pairs(state.enemies)) {
			if (id === enemyIdToPause) {
				const updatedPauses = [...enemy.pauses, pause];
				enemies[id] = { ...enemy, pauses: updatedPauses };
				continue;
			}

			enemies[id] = enemy;
		}

		return {
			...state,
			enemies,
		};
	},

	clearEnemies: (state) => {
		const enemies: Record<string, Enemy | undefined> = {};

		for (const [id, enemy] of pairs(state.enemies)) {
			enemies[id] = { ...enemy, health: 0, dead: true };
		}

		return {
			...state,
			enemies,
		};
	},

	setEnemyHealthScaleFactor: (state, healthScaleFactor: number) => ({
		...state,
		enemyHealthScaleFactor: healthScaleFactor,
	}),
});
