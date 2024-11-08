import { ClientEnemy } from "./client-enemy";
import { Workspace } from "@rbxts/services";
import { createPopParticles } from "./shared-functionality/vfx/particles";
import { playDummyPopSound } from "./shared-functionality/sfx/dummy-pop-sound";
import {
	playBoulderThrowAnimation,
	ThrowsBoulder,
	ThrowsBoulderModel,
} from "./shared-functionality/vfx/attack-animations/throw-boulder";
import { createAnimationTrack } from "../animation-utils";
import { getEnemyModelFromType } from "./shared-functionality/enemy-type-to-model-map";
import { animations } from "./shared-functionality/vfx/animations";

export class ClientDummyTank extends ClientEnemy<ThrowsBoulderModel> implements ThrowsBoulder {
	private readonly walkAnimation: AnimationTrack;
	private readonly retrieveAnimation: AnimationTrack;
	private readonly windUpAnimation: AnimationTrack;
	private readonly throwAnimation: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const dummyTankModel = getEnemyModelFromType("DUMMY_TANK");
		dummyTankModel.Parent = Workspace;

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyTankModel;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		dummyTankModel.rightArm.boulder.Transparency = 1;

		super(dummyTankModel, id, cframe);

		this.walkAnimation = createAnimationTrack({
			id: animations.slow_walk,
			parent: animator,
			animator,
		});

		this.retrieveAnimation = createAnimationTrack({
			id: animations.dummy_tank_retrieve,
			parent: animator,
			animator,
		});

		this.windUpAnimation = createAnimationTrack({
			id: animations.dummy_tank_wind_up,
			parent: animator,
			animator,
		});

		this.throwAnimation = createAnimationTrack({
			id: animations.dummy_tank_throw,
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

	destroy() {
		const position = this.getModel().humanoidRootPart.Position;

		createPopParticles(position, 25);
		playDummyPopSound(position);

		super.destroy();
	}
}
