import { CombineStates } from "@rbxts/reflex";
import { enemySlice } from "./enemy";
import { towerSlice } from "./tower";
import { moneySlice } from "./money";
import { musicSlice } from "./music";
import { dialogSlice } from "./dialog";
import { objectiveSlice } from "./objective";
import { levelSlice } from "./level";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	enemy: enemySlice,
	level: levelSlice,
	tower: towerSlice,
	money: moneySlice,
	music: musicSlice,
	dialog: dialogSlice,
	objective: objectiveSlice,
};
