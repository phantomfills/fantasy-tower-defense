import { ClientEnemy, EnemyModel } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";

export class ClientImpostor extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const impostorModel = ReplicatedStorage.assets.enemies.models.impostor.Clone();
		impostorModel.Parent = Workspace;
		super(impostorModel, id, cframe);
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 100, Color3.fromRGB(255, 0, 0));
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
