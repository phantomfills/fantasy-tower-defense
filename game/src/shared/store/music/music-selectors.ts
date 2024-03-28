import { SharedState } from "..";

export function selectTrackId(state: SharedState): string | undefined {
	return state.music.trackId;
}
