export const TOWER_TYPE = {
	ARCHER: "ARCHER",
} as const;

export type ObjectValues<T> = T[keyof T];

export type TowerType = ObjectValues<typeof TOWER_TYPE>;
