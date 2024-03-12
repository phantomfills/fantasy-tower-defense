import Object from "@rbxts/object-utils";
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
				damage: 24,
				range: 14,
				cooldown: 2.2,
				health: 150,
				cost: 800,
				title: "Vanessa, Archer",
				description: "She fires arrows at enemies which can pierce!",
			},
			{
				damage: 30,
				range: 15,
				cooldown: 2.2,
				health: 175,
				cost: 725,
				title: "Level Up",
				description: "Vanessa sees further, and deals more damage!",
			},
			{
				damage: 32,
				range: 15,
				cooldown: 2,
				health: 175,
				cost: 1350,
				title: "Enhanced Eyesight",
				description: "Detects camoflauged enemies. Also attacks faster.",
			},
			{
				damage: 70,
				range: 17.5,
				cooldown: 1.25,
				health: 250,
				cost: 3800,
				title: "Crossbow",
				description: "Fast attacking, long range crossbow that can pierce through many enemies!",
			},
			{
				damage: 90,
				range: 19.5,
				cooldown: 0.45,
				health: 400,
				cost: 13300,
				title: "Hunter's Instinct",
				description:
					"She attacks faster and does powerful critical shots every so often that deal MASSIVELY increased damage.",
			},
			{
				damage: 100,
				range: 22.5,
				cooldown: 0.18,
				health: 600,
				cost: 24500,
				title: "ELITE SHARPSHOOTER",
				description:
					"Elite Sharpshooter shoots really fast and devastates most enemy types with ease! Watch out; you might be next!",
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
