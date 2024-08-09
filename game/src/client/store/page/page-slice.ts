import { createProducer } from "@rbxts/reflex";

export type E_Pages = "GAME" | "SETTINGS" | "OBJECTIVES";

interface PageState {
	currentPage: E_Pages;
}

const initialState: PageState = {
	currentPage: "GAME",
};

export const pageSlice = createProducer(initialState, {
	setPage: (state, page: E_Pages) => {
		return {
			...state,
			currentPage: page,
		};
	},
});
