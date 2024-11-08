import { Workspace } from "@rbxts/services";
import { ClientEnemy, EnemyModel } from "./client-enemy";
import { createPopParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientDividedDummy extends ClientEnemy<EnemyModel> {
	constructor(id: string, cframe: CFrame) {
		const dividedDummyModel = getEnemyModelFromType("DIVIDED_DUMMY");
		dividedDummyModel.Parent = Workspace;
		super(dividedDummyModel, id, cframe);
	}

	start() {
		const animationController = new Instance("AnimationController");
		animationController.Parent = this.getModel();

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = createAnimationTrack({
			id: animations.default_run,
			parent: animator,
			animator,
		});
		walkAnimation.Play();
		walkAnimation.AdjustSpeed(1.75);

		super.start();
	}

	destroy() {
		const position = this.getModel().humanoidRootPart.Position;

		createPopParticles(position, 2, Color3.fromRGB(255, 255, 0));
		playDummyPopSound(position);

		super.destroy();
	}
}
