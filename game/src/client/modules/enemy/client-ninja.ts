import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class ClientNinja extends ClientEnemy {
	constructor(id: string, cframe: CFrame) {
		const foo = ReplicatedStorage.assets.enemies.dummy.models.dummy.Clone();
		foo.Parent = Workspace;
		super(foo, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.model;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = new Instance("Animation");
		walkAnimation.Parent = animator;
		walkAnimation.AnimationId = "rbxassetid://15597650423";

		const animation = animator.LoadAnimation(walkAnimation);
		animation.Play();

		super.start();
	}
}
