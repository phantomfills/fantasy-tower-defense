import { possible, Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";
import Object from "@rbxts/object-utils";

// export function selectDialogText(state: SharedState): Possible<string> {
// 	return possible(state.dialog.dialog.open ? state.dialog.dialog.text : undefined);
// }

// export function selectDialogComplete(state: SharedState): boolean {
// 	return Object.values(state.dialog.dialogComplete).every((completed) => {
// 		return completed;
// 	});
// }

// export function selectNumberOfPlayersWhoCompletedDialog(state: SharedState): number {
// 	return Object.values(state.dialog.dialogComplete).reduce((accumulator, completed) => {
// 		return accumulator + (completed ? 1 : 0);
// 	}, 0);
// }

// export function selectTotalNumberOfPlayersWhoMustCompleteDialog(state: SharedState): number {
// 	return Object.values(state.dialog.dialogComplete).size();
// }

// export function selectPlayersCanPlaceTower(state: SharedState): boolean {
// 	return state.dialog.playersCanPlaceTower;
// }

// export function selectPlayersCanUpgradeTower(state: SharedState): boolean {
// 	return state.dialog.playersCanUpgradeTower;
// }

export const selectDialogText = (state: SharedState) => state.dialog.currentDialog?.text;
