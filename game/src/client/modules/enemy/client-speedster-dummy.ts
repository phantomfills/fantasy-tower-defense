import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { createBasicDummyDeathEffects } from "./shared-functionality/dummy-utils";

export class ClientSpeedsterDummy extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const speedsterDummy = getEnemyModelFromType("SPEEDSTER_DUMMY");
		speedsterDummy.Parent = Workspace;
		super(speedsterDummy, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: "rbxassetid://16769451847",
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
