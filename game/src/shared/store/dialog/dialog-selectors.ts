import { SharedState } from "..";

export const selectDialogs = (state: SharedState) => state.dialog.currentDialogs;
