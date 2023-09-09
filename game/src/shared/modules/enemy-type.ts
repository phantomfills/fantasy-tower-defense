import { ObjectValues } from "./object-values";

export const ENEMY_TYPE = {
	NINJA: "NINJA",
} as const;

export type EnemyType = ObjectValues<typeof ENEMY_TYPE>;
