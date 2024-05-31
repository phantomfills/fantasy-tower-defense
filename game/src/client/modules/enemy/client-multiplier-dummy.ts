import { Workspace } from "@rbxts/services";
import { ClientEnemy, EnemyModel } from "./client-enemy";
import { createPopParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientMultiplierDummy extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const multiplierDummy = getEnemyModelFromType("MULTIPLIER_DUMMY");
		multiplierDummy.Parent = Workspace;
		super(multiplierDummy, id, cframe);
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
		walkAnimation.AdjustSpeed(1.5);

		super.start();
	}

	destroy() {
		const position = this.getModel().humanoidRootPart.Position;

		createPopParticles(position, 5, new Color3(0, 0.8, 1));
		playDummyPopSound(position);

		super.destroy();
	}
}
