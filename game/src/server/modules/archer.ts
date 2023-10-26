import { GenericTowerStats, Tower } from "./tower";

export class Archer extends Tower<GenericTowerStats> {
	constructor(cframe: CFrame) {
		super({
			damage: 10,
			firerate: 1,
			range: 15,
			cframe: cframe,
		});
	}
}
