import { ClientEnemy } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import {
	playBoulderProjectileAnimation,
	playBoulderThrowAnimation,
	ThrowsBoulder,
	ThrowsBoulderModel,
} from "./shared-functionality/vfx/attack-animations/throw-boulder";
import { holdFor } from "shared/modules/utils/wait-util";

interface DummyTankModel extends ThrowsBoulderModel {}

export class ClientDummyTank extends ClientEnemy<DummyTankModel> implements ThrowsBoulder {
	private readonly walkAnimation: AnimationTrack;
	private readonly retrieveAnimation: AnimationTrack;
	private readonly windUpAnimation: AnimationTrack;
	private readonly throwAnimation: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const dummyModel = ReplicatedStorage.assets.enemies.models.dummyTank.Clone();
		dummyModel.Parent = Workspace;

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyModel;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = new Instance("Animation");
		walkAnimation.Parent = animator;
		walkAnimation.AnimationId = "rbxassetid://16779246486";

		const retrieveAnimation = new Instance("Animation");
		retrieveAnimation.Parent = animator;
		retrieveAnimation.AnimationId = "rbxassetid://17224693246";

		const windUpAnimation = new Instance("Animation");
		windUpAnimation.Parent = animator;
		windUpAnimation.AnimationId = "rbxassetid://17224827704";

		const throwAnimation = new Instance("Animation");
		throwAnimation.Parent = animator;
		throwAnimation.AnimationId = "rbxassetid://17224863625";

		dummyModel.rightArm.boulder.Transparency = 1;

		super(dummyModel, id, cframe);

		this.walkAnimation = animator.LoadAnimation(walkAnimation);
		this.retrieveAnimation = animator.LoadAnimation(retrieveAnimation);
		this.windUpAnimation = animator.LoadAnimation(windUpAnimation);
		this.throwAnimation = animator.LoadAnimation(throwAnimation);
	}

	start() {
		this.walkAnimation.Play();

		super.start();
	}

	throwBoulder(towerPosition: Vector3) {
		const model = this.getModel();
		const rightArm = model.rightArm;

		playBoulderThrowAnimation({
			towerPosition,
			setLocked: (locked: boolean) => this.setLocked(locked),
			snapToCframe: (cframe: CFrame) => this.snapToCFrame(cframe),
			walkAnimation: this.walkAnimation,
			retrieveAnimation: this.retrieveAnimation,
			windUpAnimation: this.windUpAnimation,
			throwAnimation: this.throwAnimation,
			boulder: rightArm.boulder,
			boulderAttachment: rightArm.boulderAttachment,
			currentCFrame: this.getTargetCFrame(),
		});
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 25);
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
