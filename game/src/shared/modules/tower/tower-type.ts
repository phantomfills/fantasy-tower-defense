const TOWER_TYPE = ["ARCHER"] as const;

export type TowerType = (typeof TOWER_TYPE)[number];
