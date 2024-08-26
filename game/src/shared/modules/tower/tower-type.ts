const TOWER_TYPE = ["DUMMY_DEFECT", "ARCHER", "OFFICER"] as const;

export type TowerType = (typeof TOWER_TYPE)[number];
