import { ObjectValues } from "./object-values";

export const ENEMY_TYPE = {
	NINJA: "NINJA",
};

export type EnemyType = ObjectValues<typeof ENEMY_TYPE>;
