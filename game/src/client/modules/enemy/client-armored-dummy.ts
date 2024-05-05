import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { createBasicDummyDeathEffects } from "./shared-functionality/dummy-utils";

export class ClientArmoredDummy extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const armoredDummyModel = getEnemyModelFromType("ARMORED_DUMMY");
		armoredDummyModel.Parent = Workspace;
		super(armoredDummyModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: "rbxassetid://17093123019",
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
