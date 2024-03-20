import { createProducer } from "@rbxts/reflex";

interface DialogState {
	dialog: Dialog;
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
};

export const dialogSlice = createProducer(initialState, {
	setDialog: (state, text: string) => ({
		...state,
		dialog: {
			open: true,
			text,
		},
	}),

	clearDialog: (state) => ({
		...state,
		dialog: {
			open: false,
		},
	}),
});
