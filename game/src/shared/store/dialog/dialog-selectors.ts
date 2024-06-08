import { SharedState } from "..";

export const selectDialog = (state: SharedState) => state.dialog.currentDialog;

export const selectDialogText = (state: SharedState) => state.dialog.currentDialog?.text;
