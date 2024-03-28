import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { ClientEnemy } from "./client-enemy";

export class ClientDividedDummy extends ClientEnemy {
	constructor(id: string, cframe: CFrame) {
		const dummyModel = ReplicatedStorage.assets.enemies.models.dividedDummy.Clone();
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
		walkAnimation.AnimationId = "rbxassetid://16910914862";

		const animation = animator.LoadAnimation(walkAnimation);
		animation.Play();

		super.start();
	}
}
