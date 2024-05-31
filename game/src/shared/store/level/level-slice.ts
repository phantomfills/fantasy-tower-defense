import { createProducer } from "@rbxts/reflex";
import { EnemyType } from "shared/modules/enemy/enemy-type";

interface EnemyGroup {
	enemyType: EnemyType;
	count: number;
	enemySpawnInterval: number;
	delayToNextGroup: number;
}

export type Round = EnemyGroup[];

export type E_Maps = "TUTORIAL" | "DOUBLE_LANE";
export type E_OneTimeObjective = "EAT_CAKE";
export type E_ProgressiveObjective = "COMPLETE_ROUNDS";
export type E_AllObjectives = E_OneTimeObjective | E_ProgressiveObjective;

interface Level {
	name: string;
	rounds: Round[];
	mapType: E_Maps;
	lives: number;
	startingMoney: number;
	gameOver: boolean;
	objectives: E_AllObjectives[];
}

const initialState: Level = {
	name: "Tutorial",
	rounds: [
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 3,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 5,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 4,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 2,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 5,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 4,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "ARMORED_DUMMY",
				count: 7,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
			{
				enemyType: "TRAINING_DUMMY",
				count: 2,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 2,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "ARMORED_DUMMY",
				count: 12,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "STEALTH_DUMMY",
				count: 2,
				enemySpawnInterval: 500,
				delayToNextGroup: 250,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 7,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "STEALTH_DUMMY",
				count: 9,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "STEALTH_DUMMY",
				count: 5,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
			{
				enemyType: "MULTIPLIER_DUMMY",
				count: 7,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "MULTIPLIER_DUMMY",
				count: 16,
				enemySpawnInterval: 500,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 20,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "ARMORED_DUMMY",
				count: 8,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 10,
				enemySpawnInterval: 500,
				delayToNextGroup: 1_000,
			},
			{
				enemyType: "STEALTH_DUMMY",
				count: 7,
				enemySpawnInterval: 500,
				delayToNextGroup: 3_000,
			},
			{
				enemyType: "GUARD_DUMMY",
				count: 5,
				enemySpawnInterval: 1_000,
				delayToNextGroup: 0,
			},
		],
		[
			{
				enemyType: "TRAINING_DUMMY",
				count: 15,
				enemySpawnInterval: 100,
				delayToNextGroup: 250,
			},
			{
				enemyType: "ARMORED_DUMMY",
				count: 15,
				enemySpawnInterval: 175,
				delayToNextGroup: 250,
			},
			{
				enemyType: "SPEEDSTER_DUMMY",
				count: 15,
				enemySpawnInterval: 50,
				delayToNextGroup: 150,
			},
			{
				enemyType: "STEALTH_DUMMY",
				count: 15,
				enemySpawnInterval: 125,
				delayToNextGroup: 125,
			},
			{
				enemyType: "MULTIPLIER_DUMMY",
				count: 22,
				enemySpawnInterval: 125,
				delayToNextGroup: 75,
			},
			{
				enemyType: "GUARD_DUMMY",
				count: 5,
				enemySpawnInterval: 350,
				delayToNextGroup: 750,
			},
			{
				enemyType: "DUMMY_TANK",
				count: 1,
				enemySpawnInterval: 0,
				delayToNextGroup: 0,
			},
		],
	],
	lives: 1000,
	startingMoney: 1000,
	mapType: "DOUBLE_LANE",
	gameOver: false,
	objectives: ["COMPLETE_ROUNDS", "EAT_CAKE"],
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
});
