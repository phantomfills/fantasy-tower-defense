import { GenericTowerStats, Tower } from "./tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

const archerModel = ReplicatedStorage.assets.towers.archer.models.archer;

export class Archer extends Tower<GenericTowerStats> {
	constructor(cframe: CFrame) {
		const archer = archerModel.Clone();
		archer.Parent = Workspace;

		super(archer, {
			damage: 12,
			firerate: 0.1,
			range: 35,
			cframe: cframe,
		});
	}
}
