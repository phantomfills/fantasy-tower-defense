import { SharedState } from "..";

export const selectLevel = (state: SharedState) => state.level;

export const selectLives = (state: SharedState) => state.level.lives;

export const selectMapType = (state: SharedState) => state.level.mapType;

export const selectGameOver = (state: SharedState) => state.level.gameOver;

export const selectRounds = (state: SharedState) => state.level.rounds;
