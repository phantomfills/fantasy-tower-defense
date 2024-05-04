import { ClientEnemy, EnemyModel } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import { createAnimationTrack } from "./shared-functionality/vfx/animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";

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

	destroy(): void {
		const position = this.getModel().humanoidRootPart.Position;

		createDeathParticles(position);
		playDummyPopSound(position);

		super.destroy();
	}
}
