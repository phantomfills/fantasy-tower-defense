import { createProducer } from "@rbxts/reflex";
import { E_OneTimeObjective, E_ProgressiveObjective } from "../level";

type UserOneTimeObjectiveCompletionStatus = {
	[key in E_OneTimeObjective]: {
		_type: "ONE_TIME";
		value: boolean;
	};
};

type UserProgressiveObjectiveCompletionStatus = {
	[key in E_ProgressiveObjective]: {
		_type: "PROGRESSIVE";
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
	COMPLETE_10_ROUNDS: {
		_type: "PROGRESSIVE",
		progress: 0,
		maxProgress: 10,
	},
	EAT_CAKE: {
		_type: "ONE_TIME",
		value: false,
	},
};

export const objectiveSlice = createProducer(initialState, {
	initPlayerObjectives: (state, userId: string) => ({ ...state, [userId]: uncompletedObjectives }),

	completeObjectiveForPlayer: (state, userId: string, objective: E_OneTimeObjective) => ({
		...state,
		[userId]: {
			...state[userId],
			[objective]: {
				_type: "ONE_TIME",
				value: true,
			},
		},
	}),

	completeObjectiveForAllPlayers: (state, objective: E_OneTimeObjective) => {
		const newState = { ...state };
		for (const [userId] of pairs(newState)) {
			newState[userId][objective] = {
				_type: "ONE_TIME",
				value: true,
			};
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
