import { createProducer } from "@rbxts/reflex";
import { E_OneTimeObjective, E_ProgressiveObjective } from "../map";

type UserOneTimeObjectiveCompletionStatus = {
	[key in E_OneTimeObjective]: boolean;
};

type UserProgressiveObjectiveCompletionStatus = {
	[key in E_ProgressiveObjective]: {
		progress: number;
		maxProgress: number;
	};
};

export type UserObjectiveCompletionStatus = UserOneTimeObjectiveCompletionStatus &
	UserProgressiveObjectiveCompletionStatus;

interface ObjectiveState {
	[userId: string]: UserObjectiveCompletionStatus;
}

const initialState: ObjectiveState = {};

const uncompletedObjectives: UserObjectiveCompletionStatus = {
	COMPLETE_ROUNDS: {
		progress: 0,
		maxProgress: 12,
	},
	EAT_CAKE: false,
};

export const objectiveSlice = createProducer(initialState, {
	initPlayerObjectives: (state, userId: string) => ({ ...state, [userId]: uncompletedObjectives }),

	completeObjectiveForPlayer: (state, userId: string, objective: E_OneTimeObjective) => ({
		...state,
		[userId]: {
			...state[userId],
			[objective]: true,
		},
	}),

	completeObjectiveForAllPlayers: (state, objective: E_OneTimeObjective) => {
		const newState = { ...state };
		for (const [userId] of pairs(newState)) {
			newState[userId][objective] = true;
		}
		return newState;
	},

	addProgressToObjectiveForPlayer: (state, userId: string, objective: E_ProgressiveObjective, progress: number) => {
		const userObjectives = state[userId];
		const objectiveProgress = userObjectives[objective];
		const newProgress = math.min(objectiveProgress.progress + progress, objectiveProgress.maxProgress);

		return {
			...state,
			[userId]: {
				...userObjectives,
				[objective]: {
					...objectiveProgress,
					progress: newProgress,
				},
			},
		};
	},

	addProgressToObjectiveForAllPlayers: (state, objective: E_ProgressiveObjective, progress: number) => {
		const newState = { ...state };
		for (const [userId, userObjectives] of pairs(newState)) {
			const objectiveProgress = userObjectives[objective];
			const newProgress = math.min(objectiveProgress.progress + progress, objectiveProgress.maxProgress);

			newState[userId][objective] = {
				...objectiveProgress,
				progress: newProgress,
			};
		}
		return newState;
	},
});
