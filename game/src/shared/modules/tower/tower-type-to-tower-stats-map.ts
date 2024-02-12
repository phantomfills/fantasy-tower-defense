import { TowerType } from "./tower-type";

interface TowerLevel {
	damage: number;
	range: number;
	cooldown: number;
	health: number;
	cost: number;
	title: string;
	description: string;
}

interface TowerStats {
	levels: TowerLevel[];
}

const towerTypeToStatsMap: Record<TowerType, TowerStats> = {
	ARCHER: {
		levels: [
			{
				damage: 25,
				range: 12,
				cooldown: 2.2,
				health: 100,
				cost: 1000,
				title: "Archer",
				description: "Fires arrows at enemies which can pierce!",
			},
			{
				damage: 25,
				range: 15,
				cooldown: 2.2,
				health: 175,
				cost: 800,
				title: "Long Range Arrows",
				description: "Increased radius.",
			},
			{
				damage: 25,
				range: 15,
				cooldown: 1.8,
				health: 225,
				cost: 1300,
				title: "Enhanced Eyesight",
				description: "Can detect camoflauged enemies. Also attacks faster.",
			},
			{
				damage: 50,
				range: 17,
				cooldown: 1.35,
				health: 350,
				cost: 2400,
				title: "Crossbow",
				description: "Uses a fast attacking, long range crossbow that can pierce through many enemies!",
			},
			{
				damage: 70,
				range: 17,
				cooldown: 0.6,
				health: 600,
				cost: 5000,
				title: "Iron Arrows",
				description:
					"Attacks faster and does powerful critical shots every so often that deal greatly increased damage.",
			},
			{
				damage: 70,
				range: 18,
				cooldown: 0.16,
				health: 900,
				cost: 12500,
				title: "Elite Sharpshooter",
				description: "Elite Sharpshooter shoots really fast and devastates enemies with ease!",
			},
		],
	},
};

export function describeTowerFromType(_type: TowerType, level: number): TowerLevel {
	return towerTypeToStatsMap[_type].levels[level];
}

export function getTowerMaxLevelFromType(_type: TowerType): number {
	return towerTypeToStatsMap[_type].levels.size() - 1;
}
