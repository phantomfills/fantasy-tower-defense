import { ClientEnemy, EnemyModel } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";

export class ClientCriticalSportsCar extends ClientEnemy<EnemyModel> {
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
