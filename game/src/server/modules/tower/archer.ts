import { GenericTowerStats, Tower } from "../../../shared/modules/tower/tower";

export class Archer extends Tower<GenericTowerStats> {
	constructor(cframe: CFrame) {
		super("ARCHER", {
			damage: 1,
			firerate: 0.1,
			range: 25,
			cframe: cframe,
		});
	}
}
