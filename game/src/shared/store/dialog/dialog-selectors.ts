import { possible, Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";

export function selectDialogText(state: SharedState): Possible<string> {
	return possible(state.dialog.dialog.open ? state.dialog.dialog.text : undefined);
}
