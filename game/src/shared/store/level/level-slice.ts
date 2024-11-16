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

export type E_Maps = "TUTORIAL" | "DOUBLE_LANE" | "WACKY_WEATHER";
export type E_OneTimeObjective = "EAT_CAKE";
export type E_ProgressiveObjective = "COMPLETE_10_ROUNDS";
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
	started: boolean;
}

const delaysToNextGroup = {
	none: 0,
	relaxed: 1_000,
	tense: 3_000,
};

const enemySpawnIntervals = {
	relaxed: 1_000,
	horde: 500,
} as const;

const dialogTimestamps = {
	conversation: 10_000,
	information: 15_000,
} as const;

const initialState: Level = {
	name: "Wacky Weather",
	rounds: [
		{
			enemyGroups: [
				{
					enemyType: "ZOMBIE",
					count: 6,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Welcome to the tutorial!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "You can place towers by tapping on the buttons at the bottom of the screen and then moving them anywhere on the map and double tapping.",
					disappearTimestamp: dialogTimestamps.information,
				},
			],
		},
		{
			enemyGroups: [
				{
					enemyType: "ZOMBIE",
					count: 12,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.relaxed,
				},
				{
					enemyType: "ZOMBIE_SWORDER",
					count: 3,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Zombie Sworders incoming!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "They will slash at your towers and deal damage to them.",
					disappearTimestamp: dialogTimestamps.information,
				},
			],
		},
	],
	lives: 1_000,
	startingMoney: 100_000,
	mapType: "WACKY_WEATHER",
	gameOver: false,
	objectives: ["COMPLETE_10_ROUNDS", "EAT_CAKE"],
	playersCanPlaceTowers: true,
	playersCanUpgradeTowers: true,
	started: false,
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

	start: (state) => ({
		...state,
		started: true,
	}),
});
