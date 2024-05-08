import { ClientTower } from "../client-tower";
import { DummyDefectPistolModel } from "./single-pistol-dummy-defect";
import { createSound } from "client/modules/utils/sound";
import { createAnimationTrack } from "client/modules/animation-utils";
import { createBulletTrail } from "./bullet-trail";
import { sounds } from "shared/modules/sounds/sounds";
import { getPositionWithY } from "./position-with-y";
import { createSmokeParticles } from "client/modules/enemy/shared-functionality/vfx/particles";
import { holdForPromise } from "shared/modules/utils/wait-util";

interface DummyDefectDualPistolModel extends DummyDefectPistolModel {
	leftArm: BasePart & {
		pistol: {
			tipAttachment: Attachment;
		};
	};
}

export class DualPistolDummyDefect extends ClientTower<DummyDefectDualPistolModel> {
	private attackAnimationTrack1: AnimationTrack;
	private attackAnimationTrack2: AnimationTrack;
	private attackAnimationFlag: boolean;
	private attackSounds: Sound[];

	constructor(model: DummyDefectDualPistolModel, id: string, cframe: CFrame) {
		super(model, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = model;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const idle = createAnimationTrack({
			id: "rbxassetid://16995791208",
			parent: animator,
			animator,
		});
		idle.Play();

		const attack1 = createAnimationTrack({
			id: "rbxassetid://16995813016",
			parent: animator,
			animator,
		});
		this.attackAnimationTrack1 = attack1;

		const attack2 = createAnimationTrack({
			id: "rbxassetid://16995826343",
			parent: animator,
			animator,
		});
		this.attackAnimationTrack2 = attack2;

		this.attackAnimationFlag = false;

		this.attackSounds = [
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 0.8, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1.2, parent: model.humanoidRootPart }),
		];
	}

	private toggleAttackAnimationFlag() {
		this.attackAnimationFlag = !this.attackAnimationFlag;
	}

	private getCurrentAttackAnimationTrack() {
		if (this.attackAnimationFlag) {
			return this.attackAnimationTrack1;
		}
		return this.attackAnimationTrack2;
	}

	attack(towardsPosition: Vector3) {
		super.attack(towardsPosition);

		const arm = this.attackAnimationFlag ? this.getModel().rightArm : this.getModel().leftArm;

		const tipPosition = arm.pistol.tipAttachment.WorldPosition;
		const enemyPositionWithTipY = getPositionWithY(towardsPosition, tipPosition.Y);

		if (this.attackAnimationFlag) {
			createBulletTrail(tipPosition, enemyPositionWithTipY);
		} else {
			createBulletTrail(tipPosition, enemyPositionWithTipY);
		}
		holdForPromise(175).andThenCall(createSmokeParticles, tipPosition, 2);

		const currentAnimationTrack = this.getCurrentAttackAnimationTrack();
		currentAnimationTrack.Play();

		this.attackSounds[math.random(0, this.attackSounds.size() - 1)].Play();

		this.toggleAttackAnimationFlag();
	}
}
