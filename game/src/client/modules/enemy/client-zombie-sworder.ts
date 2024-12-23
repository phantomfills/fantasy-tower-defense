import { Workspace } from "@rbxts/services";
import { ClientEnemy } from "./client-enemy";
import { EnemyModel } from "shared/constants/enemy";
import { getEnemyModelFromType } from "shared/constants/enemy";
import { createAnimationTrack } from "../animation-utils";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientZombieSworder extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const model = getEnemyModelFromType("ZOMBIE_SWORDER");
		model.Parent = Workspace;

		super(model, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: animations.sworder_walk,
			parent: animator,
			animator,
		});
		walkAnimation.Play();

		super.start();
	}
}
