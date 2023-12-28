import { ClientTower } from "./client-tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export class ClientArcher extends ClientTower {
	constructor(id: string, cframe: CFrame) {
		const archerModel = ReplicatedStorage.assets.towers.archer.models.archer.Clone();
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = archerModel;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const idleAnimation = new Instance("Animation");
		idleAnimation.Parent = animator;
		idleAnimation.AnimationId = "rbxassetid://15760446189";

		const animation = animator.LoadAnimation(idleAnimation);
		animation.Play();
	}
}
