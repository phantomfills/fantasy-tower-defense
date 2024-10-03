import { USER_ID } from "shared/constants/core";
import { SharedState } from "..";

export const selectDialogs = (state: SharedState) => state.dialog.currentDialogs;

export const selectOwnDialogIndex = (state: SharedState) =>
	state.dialog.completionState[USER_ID] ? state.dialog.completionState[USER_ID].dialogIndex : 0;
