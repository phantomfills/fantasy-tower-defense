import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class ClientNinja extends ClientEnemy {
	constructor(id: string, cframe: CFrame) {
		const foo = ReplicatedStorage.assets.enemies.foo.models.foo.Clone();
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
		walkAnimation.AnimationId = "rbxassetid://14870146765";

		animator.LoadAnimation(walkAnimation).Play();

		super.start();
	}
}
