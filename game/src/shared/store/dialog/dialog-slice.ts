import { createProducer } from "@rbxts/reflex";
import { Dialog } from "../level";

interface DialogState {
	currentDialog: Dialog | undefined;
}

const initialState: DialogState = {
	currentDialog: undefined,
};

export const dialogSlice = createProducer(initialState, {
	setDialog: (state, dialog: Dialog) => ({
		...state,
		currentDialog: dialog,
	}),

	clearDialog: (state) => ({
		...state,
		currentDialog: undefined,
	}),
});
