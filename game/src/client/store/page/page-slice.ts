import { createProducer } from "@rbxts/reflex";

const PAGES = ["GAME", "PLACING", "SETTINGS", "OBJECTIVES", "WELCOME"] as const;

export type E_Pages = (typeof PAGES)[number];

interface PageState {
	currentPage: E_Pages;
}

const initialState: PageState = {
	currentPage: "WELCOME",
};

export const pageSlice = createProducer(initialState, {
	setPage: (state, page: E_Pages) => {
		return {
			...state,
			currentPage: page,
		};
	},
});
