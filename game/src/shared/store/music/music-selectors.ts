import { Possible } from "shared/modules/utils/possible";
import { SharedState } from "..";

export function selectPossibleTrackId(state: SharedState): Possible<string> {
	return state.music.trackId;
}
