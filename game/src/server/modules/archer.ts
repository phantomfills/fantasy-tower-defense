import { GenericTowerStats, Tower } from "./tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

const archerModel = ReplicatedStorage.assets.towers.archer.models.archer;

export class Archer extends Tower<GenericTowerStats> {
	constructor(cframe: CFrame) {
		const archer = archerModel.Clone();
		archer.Parent = Workspace;

		super(archer, {
			damage: 10,
			firerate: 1,
			range: 60,
			cframe: cframe,
		});
	}
}
