import { createProducer } from "@rbxts/reflex";
import { EnemyType } from "shared/modules/enemy/enemy-type";

interface EnemyGroup {
	enemyType: EnemyType;
	count: number;
	enemySpawnInterval: number;
	delayToNextGroup: number;
}

export type Round = {
	enemyGroups: EnemyGroup[];
	dialogs: Dialog[];
};

export type E_Maps = "TUTORIAL" | "DOUBLE_LANE";
export type E_OneTimeObjective = "EAT_CAKE";
export type E_ProgressiveObjective = "COMPLETE_ROUNDS";
export type E_AllObjectives = E_OneTimeObjective | E_ProgressiveObjective;

interface AutoDisappearDialog {
	dialogType: "AUTO_DISAPPEAR";
	text: string;
	disappearTimestamp: number;
}

interface CallbackDialog {
	dialogType: "CALLBACK";
	text: string;
	callback: () => void;
}

export type Dialog = AutoDisappearDialog | CallbackDialog;

interface Level {
	name: string;
	rounds: Round[];
	mapType: E_Maps;
	lives: number;
	startingMoney: number;
	gameOver: boolean;
	objectives: E_AllObjectives[];
	playersCanPlaceTowers: boolean;
	playersCanUpgradeTowers: boolean;
}

const initialState: Level = {
	name: "Tutorial",
	rounds: [
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 5,
					enemySpawnInterval: 1000,
					delayToNextGroup: 0,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Welcome to the tutorial! Click on the dummy to attack it.",
					disappearTimestamp: 5000,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Other text",
					disappearTimestamp: 5000,
				},
			],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 5,
					enemySpawnInterval: 1000,
					delayToNextGroup: 0,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Yes, you can do it!",
					disappearTimestamp: 5000,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Hello",
					disappearTimestamp: 5000,
				},
			],
		},
	],
	lives: 1000,
	startingMoney: 1000,
	mapType: "DOUBLE_LANE",
	gameOver: false,
	objectives: ["COMPLETE_ROUNDS", "EAT_CAKE"],
	playersCanPlaceTowers: true,
	playersCanUpgradeTowers: true,
};

export const levelSlice = createProducer(initialState, {
	incrementLives: (state, lives: number) => ({
		...state,
		lives: state.lives + lives,
	}),

	deductLives: (state, lives: number) => ({
		...state,
		lives: math.max(state.lives - lives, 0),
	}),

	setPlayersCanPlaceTowers: (state, canPlaceTowers: boolean) => ({
		...state,
		playersCanPlaceTowers: canPlaceTowers,
	}),

	setPlayersCanUpgradeTowers: (state, canUpgradeTowers: boolean) => ({
		...state,
		playersCanUpgradeTowers: canUpgradeTowers,
	}),
});
