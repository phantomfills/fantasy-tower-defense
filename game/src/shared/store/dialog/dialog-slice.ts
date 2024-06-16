import { createProducer } from "@rbxts/reflex";
import { Dialog } from "../level";

interface DialogState {
	currentDialogs: Dialog[];
}

const initialState: DialogState = {
	currentDialogs: [],
};

export const dialogSlice = createProducer(initialState, {
	setDialogs: (state, dialogs: Dialog[]) => ({
		...state,
		currentDialogs: dialogs,
	}),

	clearDialogs: (state) => ({
		...state,
		currentDialogs: [],
	}),
});
