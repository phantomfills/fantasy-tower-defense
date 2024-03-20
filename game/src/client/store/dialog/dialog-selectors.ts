import { possible, Possible } from "shared/modules/utils/possible";
import { RootState } from "..";

export function selectDialogText(state: RootState): Possible<string> {
	return possible(state.dialog.dialog.open ? state.dialog.dialog.text : undefined);
}
