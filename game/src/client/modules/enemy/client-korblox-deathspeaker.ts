import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createPopParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { createAnimationTrack } from "./shared-functionality/vfx/animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";

export class ClientKorbloxDeathspeaker extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const korbloxDeathspeakerModel = getEnemyModelFromType("KORBLOX_DEATHSPEAKER");
		korbloxDeathspeakerModel.Parent = Workspace;
		super(korbloxDeathspeakerModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: "rbxassetid://17092586958",
			parent: animator,
			animator,
		});
		walkAnimation.Play();

		super.start();
	}

	destroy(): void {
		const position = this.getModel().humanoidRootPart.Position;

		createPopParticles(position, 15, Color3.fromRGB(0, 0, 255));
		playDummyPopSound(position);

		super.destroy();
	}
}
