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
import { createAnimationTrack } from "./shared-functionality/vfx/animation-utils";

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

		dummyModel.rightArm.boulder.Transparency = 1;

		super(dummyModel, id, cframe);

		this.walkAnimation = createAnimationTrack({
			id: "rbxassetid://16779246486",
			parent: animator,
			animator,
		});

		this.retrieveAnimation = createAnimationTrack({
			id: "rbxassetid://17224693246",
			parent: animator,
			animator,
		});

		this.windUpAnimation = createAnimationTrack({
			id: "rbxassetid://17224827704",
			parent: animator,
			animator,
		});

		this.throwAnimation = createAnimationTrack({
			id: "rbxassetid://17224827704",
			parent: animator,
			animator,
		});
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
