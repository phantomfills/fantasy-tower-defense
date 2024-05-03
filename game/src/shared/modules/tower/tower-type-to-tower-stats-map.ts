import { TowerType } from "./tower-type";
import { E_Trait } from "../attack/trait";

interface TowerLevel {
	damage: number;
	range: number;
	cooldown: number;
	maxHealth: number;
	cost: number;
	title: string;
	description: string;
	traits: E_Trait[];
}

interface TowerStats {
	levels: TowerLevel[];
}

const towerTypeToStatsMap: Record<TowerType, TowerStats> = {
	DUMMY_DEFECT: {
		levels: [
			{
				damage: 5,
				range: 10,
				cooldown: 1.2,
				maxHealth: 100,
				cost: 200,
				title: "Dummy Defect",
				description: "Shoots at enemies with a basic pistol.",
				traits: [],
			},
			{
				damage: 8,
				range: 10,
				cooldown: 1.2,
				maxHealth: 105,
				cost: 110,
				title: "Focused Aim",
				description: "Deals more damage to enemies.",
				traits: [],
			},
			{
				damage: 8,
				range: 11,
				cooldown: 1,
				maxHealth: 125,
				cost: 135,
				title: "Cool Shades",
				description: "Increases range and attacks more quickly. Can detect stealth enemies.",
				traits: ["STEALTH"],
			},
			{
				damage: 10,
				range: 12,
				cooldown: 0.8,
				maxHealth: 160,
				cost: 280,
				title: "Power Shot",
				description: "Shoots faster, sees further and deals more damage. Can also penetrate armor.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 12,
				range: 13,
				cooldown: 0.55,
				maxHealth: 195,
				cost: 415,
				title: "Dual Wield",
				description: "Fires from two pistols at once, increasing cooldown speed.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 15,
				range: 15,
				cooldown: 0.425,
				maxHealth: 225,
				cost: 625,
				title: "Dummy Destroyer",
				description: "Fires rapidly and deals massive damage to enemies.",
				traits: ["STEALTH", "REINFORCED"],
			},
		],
	},
	ARCHER: {
		levels: [
			{
				damage: 8,
				range: 12,
				cooldown: 1.6,
				maxHealth: 100,
				cost: 700,
				title: "Vanessa, Archer",
				description: "She fires arrows at enemies which can pierce!",
				traits: [],
			},
			{
				damage: 8,
				range: 13,
				cooldown: 1.2,
				maxHealth: 125,
				cost: 275,
				title: "Level Up",
				description: "Vanessa can see further and shoot faster!",
				traits: [],
			},
			{
				damage: 14,
				range: 13,
				cooldown: 1.2,
				maxHealth: 135,
				cost: 475,
				title: "Iron Tipped Arrows",
				description: "Iron tipped arrows deal WAY more damage! Also penetrates armor.",
				traits: ["REINFORCED"],
			},
			{
				damage: 40,
				range: 14.5,
				cooldown: 1.2,
				maxHealth: 150,
				cost: 1_600,
				title: "Crossbow",
				description:
					"Fast attacking, long range crossbow that deals massive damage to foes! Also detects stealth enemies.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 60,
				range: 15.5,
				cooldown: 0.8,
				maxHealth: 180,
				cost: 5_500,
				title: "Hunter's Instinct",
				description:
					"She attacks faster, deals more damage and does powerful critical shots every so often that deal MASSIVELY increased damage!",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 100,
				range: 16.5,
				cooldown: 0.6,
				maxHealth: 200,
				cost: 14_000,
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

export function getTowerUpgradeCost(_type: TowerType, level: number): number | undefined {
	const towerLevel = towerTypeToStatsMap[_type].levels[level];
	if (!towerLevel) return;

	return towerLevel.cost;
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

export function getUpgradeTitle(_type: TowerType, level: number): string | undefined {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return;

	return nextStats.title;
}

export function getUpgradeDescription(_type: TowerType, level: number): string | undefined {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return;

	return nextStats.description;
}

export function getUpgradeCost(_type: TowerType, level: number): number | undefined {
	const nextStats = towerTypeToStatsMap[_type].levels[level];
	if (!nextStats) return;

	return nextStats.cost;
}

export function getPlacementCostForTower(_type: TowerType): number {
	return towerTypeToStatsMap[_type].levels[0].cost;
}
