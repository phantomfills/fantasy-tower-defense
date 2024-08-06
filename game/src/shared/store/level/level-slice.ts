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
	name: "Tutorial",
	rounds: [
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 3,
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
					enemyType: "TRAINING_DUMMY",
					count: 5,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 8,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Seems we've got a horde of training dummies coming in!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Click on your tower and click the upgrade button to try and take them out faster!",
					disappearTimestamp: dialogTimestamps.information,
				},
			],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 15,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 8,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.tense,
				},
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 4,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Speedster dummies incoming! They are faster than the training dummies!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "Use your money to upgrade your towers or place more towers to deal with them!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
			],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 10,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.relaxed,
				},
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 7,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
		{
			enemyGroups: [
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 20,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
		{
			enemyGroups: [
				{
					enemyType: "TRAINING_DUMMY",
					count: 15,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.tense,
				},
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 15,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
		{
			enemyGroups: [
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 40,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "We've got a MASSIVE horde of speedster dummies coming in!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
				{
					dialogType: "AUTO_DISAPPEAR",
					text: "The next round is gonna be a hard one. Good luck!",
					disappearTimestamp: dialogTimestamps.conversation,
				},
			],
		},
		{
			enemyGroups: [
				{
					enemyType: "ARMORED_DUMMY",
					count: 1,
					enemySpawnInterval: enemySpawnIntervals.relaxed,
					delayToNextGroup: delaysToNextGroup.tense,
				},
				{
					enemyType: "TRAINING_DUMMY",
					count: 10,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.tense,
				},
				{
					enemyType: "SPEEDSTER_DUMMY",
					count: 10,
					enemySpawnInterval: enemySpawnIntervals.horde,
					delayToNextGroup: delaysToNextGroup.none,
				},
			],
			dialogs: [],
		},
	],
	lives: 1_000,
	startingMoney: 500,
	mapType: "TUTORIAL",
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
