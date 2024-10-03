import { createProducer } from "@rbxts/reflex";
import { Dialog } from "../level";

interface DialogCompletionState {
	[userId: string]: {
		dialogIndex: number;
	};
}

interface DialogState {
	currentDialogs: Dialog[];
	completionState: DialogCompletionState;
}

const initialState: DialogState = {
	currentDialogs: [],
	completionState: {},
};

export const dialogSlice = createProducer(initialState, {
	setDialogs: (state, dialogs: Dialog[]) => ({
		...state,
		currentDialogs: dialogs,
		completionState: {},
	}),

	clearDialogs: (state) => ({
		...state,
		currentDialogs: [],
		completionState: {},
	}),

	incrementDialogIndex: (state, userId: string) => ({
		...state,
		completionState: {
			...state.completionState,
			[userId]: {
				dialogIndex:
					state.completionState[userId] === undefined ? 1 : state.completionState[userId].dialogIndex + 1,
			},
		},
	}),
});
