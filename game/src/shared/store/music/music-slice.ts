import { createProducer } from "@rbxts/reflex";
import { Possible } from "shared/modules/utils/possible";

interface MusicState {
	trackId: Possible<string>;
}

const initialState: MusicState = {
	trackId: {
		exists: false,
	},
};

export const musicSlice = createProducer(initialState, {
	setTrackId: (state, trackId: string) => ({
		...state,
		trackId: {
			exists: true,
			value: trackId,
		},
	}),

	clearTrackId: (state) => ({
		...state,
		trackId: { exists: false },
	}),
});
