import { createProducer } from "@rbxts/reflex";

interface PlayerDialogCompletionState {
	[userId: string]: boolean;
}

interface DialogState {
	dialog: Dialog;
	dialogComplete: PlayerDialogCompletionState;
}

type Dialog =
	| {
			open: true;
			text: string;
	  }
	| {
			open: false;
	  };

const initialState: DialogState = {
	dialog: {
		open: false,
	},
	dialogComplete: {},
};

export const dialogSlice = createProducer(initialState, {
	setDialog: (state, text: string, dialogComplete: PlayerDialogCompletionState) => ({
		...state,
		dialog: {
			open: true,
			text,
		},
		dialogComplete,
	}),

	clearDialog: (state) => ({
		...state,
		dialog: {
			open: false,
		},
		dialogComplete: {},
	}),

	completeDialogForPlayer: (state, userId: string) => ({
		...state,
		dialogComplete: {
			...state.dialogComplete,
			[userId]: true,
		},
	}),
});
