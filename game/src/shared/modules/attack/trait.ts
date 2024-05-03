export type E_Trait = "STEALTH" | "REINFORCED";

export function doTowerAndEnemyHaveStealth(enemyTraits: E_Trait[], towerTraits: E_Trait[]) {
	return enemyTraits.includes("STEALTH") ? towerTraits.includes("STEALTH") : true;
}

export function calculateEffectiveTowerDamageIfEnemyIsReinforced(
	damage: number,
	enemyTraits: E_Trait[],
	towerTraits: E_Trait[],
) {
	return enemyTraits.includes("REINFORCED") ? (towerTraits.includes("REINFORCED") ? damage : 0) : damage;
}
