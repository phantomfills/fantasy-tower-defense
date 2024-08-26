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
				damage: 1,
				range: 12,
				cooldown: 2,
				maxHealth: 100,
				cost: 270,
				title: "Dummy Defect",
				description: "Shoots at enemies with a basic pistol.",
				traits: [],
			},
			{
				damage: 2,
				range: 12,
				cooldown: 2,
				maxHealth: 250,
				cost: 95,
				title: "Gamer Hat",
				description: "Deals more damage to enemies.",
				traits: [],
			},
			{
				damage: 2,
				range: 14,
				cooldown: 1.8,
				maxHealth: 300,
				cost: 235,
				title: "Epic Shades",
				description: "Increases range and attacks more quickly. Can detect stealth enemies.",
				traits: ["STEALTH"],
			},
			{
				damage: 5,
				range: 14,
				cooldown: 1.6,
				maxHealth: 450,
				cost: 440,
				title: "Drippy",
				description: "Shoots faster and deals more damage. Can also penetrate armor.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 5,
				range: 14,
				cooldown: 1,
				maxHealth: 575,
				cost: 620,
				title: "Double Tap",
				description: "Fires from two pistols at once, increasing cooldown speed.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 6,
				range: 14,
				cooldown: 0.6,
				maxHealth: 995,
				cost: 870,
				title: "America",
				description: "Shoots much faster and deals more damage.",
				traits: ["STEALTH", "REINFORCED"],
			},
		],
	},
	ARCHER: {
		levels: [
			{
				damage: 70,
				range: 12,
				cooldown: 2,
				maxHealth: 100,
				cost: 500,
				title: "Vanessa, Archer",
				description: "She fires arrows at enemies which can pierce!",
				traits: [],
			},
			{
				damage: 70,
				range: 12,
				cooldown: 1.4,
				maxHealth: 150,
				cost: 150,
				title: "Level Up",
				description: "Vanessa attacks more quickly!",
				traits: [],
			},
			{
				damage: 100,
				range: 12,
				cooldown: 1.4,
				maxHealth: 300,
				cost: 300,
				title: "Iron Tipped Arrows",
				description: "Iron tipped arrows deal WAY more damage and pierce armor!",
				traits: ["REINFORCED"],
			},
			{
				damage: 160,
				range: 15,
				cooldown: 1.2,
				maxHealth: 750,
				cost: 1_800,
				title: "Crossbow",
				description:
					"Fast attacking, long range crossbow that deals massive damage to foes! Also detects stealth enemies.",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 225,
				range: 15,
				cooldown: 0.9,
				maxHealth: 1_200,
				cost: 4_500,
				title: "Hunter's Instinct",
				description:
					"She attacks faster, deals more damage and does powerful critical shots every so often that deal MASSIVELY increased damage!",
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				damage: 100,
				range: 20,
				cooldown: 0.22,
				maxHealth: 2_500,
				cost: 10_000,
				title: "ELITE SHARPSHOOTER",
				description: "Elite Sharpshooter shoots really fast and devastates most enemy types with ease!",
				traits: ["STEALTH", "REINFORCED"],
			},
		],
	},
	OFFICER: {
		levels: [
			{
				cost: 600,
				damage: 75,
				cooldown: 1.5,
				range: 5,
				title: "Officer",
				description: "Fires at enemies with a powerful shotgun.",
				maxHealth: 300,
				traits: [],
			},
			{
				cost: 250,
				damage: 75,
				cooldown: 1.5,
				range: 6,
				title: "Cool Hat",
				description: "Longer range.",
				maxHealth: 350,
				traits: [],
			},
			{
				cost: 450,
				damage: 100,
				cooldown: 1.5,
				range: 6,
				title: "Improved Handling",
				description: "Deals more damage.",
				maxHealth: 500,
				traits: [],
			},
			{
				cost: 1350,
				damage: 100,
				cooldown: 1.1,
				range: 6,
				title: "Legit Badge",
				description: "Faster attack speed. Also detects stealth.",
				maxHealth: 550,
				traits: ["STEALTH"],
			},
			{
				cost: 3_750,
				damage: 175,
				cooldown: 0.9,
				range: 7,
				title: "Riot Armour",
				description: "Increase to most stats. Penetrates armor. Huge increase to health.",
				maxHealth: 2_950,
				traits: ["STEALTH", "REINFORCED"],
			},
			{
				cost: 12_500,
				damage: 40,
				cooldown: 0.12,
				range: 7,
				title: "This Helmet Looks Weird",
				description: "Yo what does this even do?",
				maxHealth: 10_000,
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
