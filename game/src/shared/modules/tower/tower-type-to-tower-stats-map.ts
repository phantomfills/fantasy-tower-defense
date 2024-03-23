import Object from "@rbxts/object-utils";
import { TowerType } from "./tower-type";
import { Trait } from "../attack/immunity";

interface TowerLevel {
	damage: number;
	range: number;
	cooldown: number;
	health: number;
	cost: number;
	title: string;
	description: string;
	traits: Trait[];
}

interface TowerStats {
	levels: TowerLevel[];
}

const towerTypeToStatsMap: Record<TowerType, TowerStats> = {
	ARCHER: {
		levels: [
			{
				damage: 30,
				range: 11,
				cooldown: 1.6,
				health: 100,
				cost: 1_000,
				title: "Vanessa, Archer",
				description: "She fires arrows at enemies which can pierce!",
				traits: [],
			},
			{
				damage: 30,
				range: 12,
				cooldown: 1.2,
				health: 125,
				cost: 350,
				title: "Level Up",
				description: "Vanessa can see further and shoot faster!",
				traits: [],
			},
			{
				damage: 50,
				range: 12,
				cooldown: 1.2,
				health: 135,
				cost: 625,
				title: "Iron Tipped Arrows",
				description: "Iron tipped arrows deal WAY more damage!",
				traits: [],
			},
			{
				damage: 130,
				range: 14,
				cooldown: 1.2,
				health: 150,
				cost: 2_750,
				title: "Crossbow",
				description:
					"Fast attacking, long range crossbow that can pierce through many enemies! Also detects stealth enemies.",
				traits: ["STEALTH"],
			},
			{
				damage: 175,
				range: 15,
				cooldown: 0.75,
				health: 175,
				cost: 7_250,
				title: "Hunter's Instinct",
				description:
					"She attacks faster, deals more damage and does powerful critical shots every so often that deal MASSIVELY increased damage. Gains armor penetration.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 100,
				range: 16,
				cooldown: 0.1,
				health: 200,
				cost: 27_200,
				title: "ELITE SHARPSHOOTER",
				description: "Elite Sharpshooter shoots really fast and devastates most enemy types with ease!",
				traits: ["STEALTH", "REINFORCED"],
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

export function getTowerUpgradeCost(_type: TowerType, level: number): number {
	return towerTypeToStatsMap[_type].levels[level] ? towerTypeToStatsMap[_type].levels[level].cost : 0;
}

export function getTotalCostForTowerUpToLevel(_type: TowerType, level: number): number {
	let totalCost = 0;
	for (let index = 0; index <= level; index++) {
		totalCost += towerTypeToStatsMap[_type].levels[index].cost;
	}
	return totalCost;
}

export function getSellPriceForTower(_type: TowerType, level: number, sellbackRate: number): number {
	const sellPrice = math.floor(getTotalCostForTowerUpToLevel(_type, level) * sellbackRate);
	return sellPrice;
}

export function getUpgradeTitle(_type: TowerType, level: number): string {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return "YOU MAXED THIS TOWER!";

	return `Lv. ${level} - ${nextStats.title}`;
}

export function getUpgradeDescription(_type: TowerType, level: number): string {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return "INFINITE POWER!!";

	return nextStats.description;
}

export function getUpgradeCost(_type: TowerType, level: number): number {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return 0;

	return nextStats.cost;
}

export function getPlacementCostForTower(_type: TowerType): number {
	return towerTypeToStatsMap[_type].levels[0].cost;
}
