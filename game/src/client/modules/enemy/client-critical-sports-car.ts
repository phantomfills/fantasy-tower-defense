import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./particles";
import { playDummyPopSound } from "./dummy-pop-sound";

export class ClientCriticalSportsCar extends ClientEnemy {
	constructor(id: string, cframe: CFrame) {
		const criticalSportsCarModel = ReplicatedStorage.assets.enemies.models.critical_sports_car.Clone();
		criticalSportsCarModel.Parent = Workspace;
		super(criticalSportsCarModel, id, cframe);
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 100, Color3.fromRGB(255, 255, 255));
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
