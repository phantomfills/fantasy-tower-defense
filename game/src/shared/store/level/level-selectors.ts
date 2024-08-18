import { SharedState } from "..";

export const selectLevel = (state: SharedState) => state.level;

export const selectLives = (state: SharedState) => state.level.lives;

export const selectMapType = (state: SharedState) => state.level.mapType;

export const selectGameOver = (state: SharedState) => state.level.gameOver;

export const selectRounds = (state: SharedState) => state.level.rounds;

export const selectPlayersCanPlaceTowers = (state: SharedState) => state.level.playersCanPlaceTowers;

export const selectPlayersCanUpgradeTowers = (state: SharedState) => state.level.playersCanUpgradeTowers;

export const selectStartingMoney = (state: SharedState) => state.level.startingMoney;

export const selectLevelObjectives = (state: SharedState) => state.level.objectives;

export const selectLevelStarted = (state: SharedState) => state.level.started;
