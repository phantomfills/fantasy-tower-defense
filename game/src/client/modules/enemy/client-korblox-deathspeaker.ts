import { ClientEnemy, EnemyModel } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";

export class ClientKorbloxDeathspeaker extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const korbloxDeathspeakerModel = ReplicatedStorage.assets.enemies.models.korblox_deathspeaker.Clone();
		korbloxDeathspeakerModel.Parent = Workspace;
		super(korbloxDeathspeakerModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = new Instance("Animation");
		walkAnimation.Parent = animator;
		walkAnimation.AnimationId = "rbxassetid://17092586958";

		const animation = animator.LoadAnimation(walkAnimation);
		animation.Play();

		super.start();
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 15, Color3.fromRGB(0, 0, 255));
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}