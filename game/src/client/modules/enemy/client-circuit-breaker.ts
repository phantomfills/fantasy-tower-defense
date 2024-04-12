import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./particles";
import { playDummyPopSound } from "./dummy-pop-sound";

export class ClientCircuitBreaker extends ClientEnemy {
	constructor(id: string, cframe: CFrame) {
		const dummyModel = ReplicatedStorage.assets.enemies.models.circuit_breaker.Clone();
		dummyModel.Parent = Workspace;
		super(dummyModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = new Instance("Animation");
		walkAnimation.Parent = animator;
		walkAnimation.AnimationId = "rbxassetid://17093123019";

		const animation = animator.LoadAnimation(walkAnimation);
		animation.Play();

		super.start();
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position);
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
