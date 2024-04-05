import { createProducer } from "@rbxts/reflex";
import { Objective } from "../map";

export type User = {
	[key in Objective]: boolean;
};

interface ObjectiveState {
	[userId: string]: User;
}

const initialState: ObjectiveState = {};

const uncompletedObjectives: User = {
	COMPLETE_LEVEL: false,
	EAT_CAKE: false,
};

export const objectiveSlice = createProducer(initialState, {
	initPlayerObjectives: (state, userId: string) => ({ ...state, [userId]: uncompletedObjectives }),

	completeObjectiveForPlayer: (state, userId: string, objective: Objective) => ({
		...state,
		[userId]: {
			...state[userId],
			[objective]: true,
		},
	}),
});
