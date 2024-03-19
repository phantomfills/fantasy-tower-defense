import Object from "@rbxts/object-utils";
import { TowerType } from "./tower-type";
import { Immunity } from "../attack/immunity";

interface TowerLevel {
	damage: number;
	range: number;
	cooldown: number;
	health: number;
	cost: number;
	title: string;
	description: string;
	traits: Immunity[];
}

interface TowerStats {
	levels: TowerLevel[];
}

const towerTypeToStatsMap: Record<TowerType, TowerStats> = {
	ARCHER: {
		levels: [
			{
				damage: 30,
				range: 12,
				cooldown: 2,
				health: 100,
				cost: 1_500,
				title: "Vanessa, Archer",
				description: "She fires arrows at enemies which can pierce!",
				traits: [],
			},
			{
				damage: 30,
				range: 14,
				cooldown: 1.8,
				health: 125,
				cost: 400,
				title: "Level Up",
				description: "Vanessa can see further and shoot faster!",
				traits: [],
			},
			{
				damage: 50,
				range: 14,
				cooldown: 1.8,
				health: 125,
				cost: 725,
				title: "Iron Tipped Arrows",
				description: "Iron tipped arrows deal more damage and can penetrate armor!",
				traits: ["REINFORCED"],
			},
			{
				damage: 80,
				range: 15,
				cooldown: 1.5,
				health: 160,
				cost: 1_600,
				title: "Crossbow",
				description:
					"Fast attacking, long range crossbow that can pierce through many enemies! Also detects stealth enemies.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 120,
				range: 16,
				cooldown: 0.8,
				health: 160,
				cost: 4_500,
				title: "Hunter's Instinct",
				description:
					"She attacks faster and does powerful critical shots every so often that deal MASSIVELY increased damage.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 200,
				range: 19,
				cooldown: 0.5,
				health: 200,
				cost: 17_500,
				title: "ELITE SHARPSHOOTER",
				description:
					"Elite Sharpshooter shoots really fast and devastates most enemy types with ease, with a HUGE radius!",
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

export function getPlacementCostForTower(_type: TowerType): number {
	return towerTypeToStatsMap[_type].levels[0].cost;
}

export function getChangesForLevel(
	_type: TowerType,
	currentLevel: number,
): { name: string; oldValue: number; newValue: number }[] {
	const currentStats = towerTypeToStatsMap[_type].levels[currentLevel];
	const nextStats = towerTypeToStatsMap[_type].levels[currentLevel + 1];

	if (!nextStats) return [];

	const changes = [];

	const keys = Object.keys(currentStats);
	for (const key of keys) {
		if (key === "cost") continue;

		const currentStat = currentStats[key];
		const nextStat = nextStats[key];

		if (!typeIs(currentStat, "number") || !typeIs(nextStat, "number")) continue;

		if (currentStat !== nextStat) {
			changes.push({ name: key, oldValue: currentStat, newValue: nextStat });
		}
	}

	return changes;
}
