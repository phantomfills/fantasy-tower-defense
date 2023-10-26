import { GenericTowerStats, Tower } from "./tower";

export class Archer extends Tower<GenericTowerStats> {
	constructor(cframe: CFrame) {
		super("ARCHER", {
			damage: 25,
			firerate: 2,
			range: 35,
			cframe: cframe,
		});
	}
}
