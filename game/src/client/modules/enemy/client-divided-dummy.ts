import { Workspace } from "@rbxts/services";
import { ClientEnemy, EnemyModel } from "./client-enemy";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { createAnimationTrack } from "./shared-functionality/vfx/animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";

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
			id: "rbxassetid://16769024725",
			parent: animator,
			animator,
		});
		walkAnimation.Play();

		super.start();
	}

	destroy(): void {
		const position = this.getModel().humanoidRootPart.Position;

		createDeathParticles(position, 2, new Color3(0.98, 1, 0));
		playDummyPopSound(position);

		super.destroy();
	}
}
