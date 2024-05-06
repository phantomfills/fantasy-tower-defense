import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { createBasicDummyDeathEffects } from "./shared-functionality/dummy-utils";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientGuardDummy extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const guardDummy = getEnemyModelFromType("GUARD_DUMMY");
		guardDummy.Parent = Workspace;
		super(guardDummy, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: animations.default_walk,
			parent: animator,
			animator,
		});
		walkAnimation.Play();

		super.start();
	}

	destroy() {
		const position = this.getModel().humanoidRootPart.Position;
		createBasicDummyDeathEffects(position);

		super.destroy();
	}
}
