import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";

export class ClientImpostor extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const impostorModel = getEnemyModelFromType("IMPOSTOR");
		impostorModel.Parent = Workspace;
		super(impostorModel, id, cframe);
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 100, Color3.fromRGB(255, 0, 0));
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
