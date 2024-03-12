import { createProducer } from "@rbxts/reflex";
import { Attack } from "shared/modules/attack";

interface AttackState {
	attacks: Record<string, Attack>;
}

const initialState: AttackState = {
	attacks: {},
};

export const attackSlice = createProducer(initialState, {
	addAttack: (state, id: string, attack: Attack) => {
		return { ...state, attacks: { ...state.attacks, [id]: attack } };
	},

	removeAttacksAssociatedWithEnemy: (state, enemyId: string) => {
		const newAttacks: Record<string, Attack> = {};
		for (const [id, attack] of pairs(state.attacks)) {
			if (attack.enemyId !== enemyId) {
				newAttacks[id] = attack;
			}
		}
		return { ...state, attacks: newAttacks };
	},
});
