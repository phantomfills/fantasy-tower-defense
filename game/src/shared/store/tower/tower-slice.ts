import { createProducer } from "@rbxts/reflex";
import { TowerType } from "shared/modules/tower/tower-type";
import { HttpService, RunService } from "@rbxts/services";

export interface Tower {
	type: TowerType;
	health: number;
	cframe: CFrame;
	attackIntervalTimestamp: number;
	attackCount: number;
	spawnTimestamp: number;
	attackDamage: number;
}

interface Attack {
	towerId: string;
	enemyId: string;
	damage: number;
}

export type TowerState = {
	attacks: Record<string, Attack>;
	towers: Record<string, Tower>;
};

const initialState: TowerState = {
	attacks: {},
	towers: {},
};

export const towerSlice = createProducer(initialState, {
	addTower: (state, id: string, tower: Tower) => {
		return { ...state, towers: { ...state.towers, [id]: tower } };
	},

	incrementTowerAttackCount: (state, id: string) => {
		return {
			...state,
			towers: { ...state.towers, [id]: { ...state.towers[id], attackCount: state.towers[id].attackCount + 1 } },
		};
	},

	addAttack: (state, attack: Attack) => {
		return { ...state, attacks: { ...state.attacks, [HttpService.GenerateGUID()]: attack } };
	},
});
