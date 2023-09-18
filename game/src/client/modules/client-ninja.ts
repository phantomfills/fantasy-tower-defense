import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage } from "@rbxts/services";

export class ClientNinja extends ClientEnemy {
	constructor(cframe: CFrame) {
		super(ReplicatedStorage.assets.enemies.foo.models.foo, "ninja", cframe);
	}
}
