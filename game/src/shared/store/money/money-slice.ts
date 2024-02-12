import { createProducer } from "@rbxts/reflex";

interface MoneyState {
	[userId: string]: number | undefined;
}

const initialState: MoneyState = {};

export const moneySlice = createProducer(initialState, {
	initializeMoney: (state, userId: string, amount: number) => {
		print(userId, amount);

		return {
			...state,
			[userId]: amount,
		};
	},

	addMoney: (state, userId: string, amount: number) => {
		const userMoney = state[userId];
		if (userMoney === undefined) throw "User does not exist";

		return {
			...state,
			[userId]: userMoney + amount,
		};
	},

	removeMoney: (state, userId: string, amount: number) => {
		const userMoney = state[userId];
		if (userMoney === undefined) throw "User does not exist";

		return {
			...state,
			[userId]: userMoney - amount,
		};
	},
});
