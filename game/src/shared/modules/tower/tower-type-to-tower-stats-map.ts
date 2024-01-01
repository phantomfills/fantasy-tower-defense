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
				damage: 10,
				range: 16,
				cooldown: 2,
				health: 200,
				cost: 1000,
				title: "Archer",
				description: "Fires arrows at enemies which can pierce!",
			},
			{
				damage: 10,
				range: 20,
				cooldown: 2,
				health: 200,
				cost: 250,
				title: "Long Range Arrows",
				description: "Increased radius.",
			},
			{
				damage: 10,
				range: 22,
				cooldown: 2,
				health: 200,
				cost: 325,
				title: "Enhanced Eyesight",
				description: "Sees further and can detect camoflauged enemies.",
			},
			{
				damage: 25,
				range: 22,
				cooldown: 2,
				health: 500,
				cost: 2200,
				title: "Crossbow",
				description: "Uses a fast attacking, long range crossbow that can pierce through many enemies!",
			},
			{
				damage: 30,
				range: 22,
				cooldown: 1,
				health: 500,
				cost: 5400,
				title: "Sharp Shooter",
				description:
					"Attacks faster and does powerful critical shots every so often that deal greatly increased damage.",
			},
			{
				damage: 20,
				range: 24,
				cooldown: 0.16,
				health: 1000,
				cost: 12000,
				title: "Crossbow Master",
				description: "Crossbow Master shoots really fast and devastates enemies with ease!",
			},
		],
	},
};

export function describeTowerFromType(_type: TowerType, level: number): TowerLevel {
	return towerTypeToStatsMap[_type].levels[level];
}
