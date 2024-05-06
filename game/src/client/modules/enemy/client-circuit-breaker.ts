import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { createBasicDummyDeathEffects } from "./shared-functionality/dummy-utils";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientCircuitBreaker extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const circuitBreakerModel = getEnemyModelFromType("CIRCUIT_BREAKER");
		circuitBreakerModel.Parent = Workspace;
		super(circuitBreakerModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: animations.quick_walk,
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
