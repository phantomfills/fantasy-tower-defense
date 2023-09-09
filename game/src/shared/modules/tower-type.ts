import { ObjectValues } from "./object-values";

export const TOWER_TYPE = {
	ARCHER: "ARCHER",
} as const;

export type TowerType = ObjectValues<typeof TOWER_TYPE>;
