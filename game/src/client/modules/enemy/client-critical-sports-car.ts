import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";

export class ClientCriticalSportsCar extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const criticalSportsCarModel = getEnemyModelFromType("CRITICAL_SPORTS_CAR");
		criticalSportsCarModel.Parent = Workspace;
		super(criticalSportsCarModel, id, cframe);
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 100, Color3.fromRGB(255, 255, 255));
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
