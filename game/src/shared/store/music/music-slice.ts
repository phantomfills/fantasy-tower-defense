import { createProducer } from "@rbxts/reflex";

interface MusicState {
	trackId: string | undefined;
}

const initialState: MusicState = {
	trackId: undefined,
};

export const musicSlice = createProducer(initialState, {
	setTrackId: (state, trackId: string) => ({
		...state,
		trackId,
	}),

	clearTrackId: (state) => ({
		...state,
		trackId: undefined,
	}),
});
