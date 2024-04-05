const TOWER_TYPE = ["DUMMY_DEFECT", "ARCHER"] as const;

export type TowerType = (typeof TOWER_TYPE)[number];
