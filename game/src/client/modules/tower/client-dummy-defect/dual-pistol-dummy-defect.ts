import { ClientTower } from "../client-tower";
import { DummyDefectPistolModel } from "./single-pistol-dummy-defect";
import { createSound } from "client/modules/utils/sound";
import { createAnimationTrack } from "client/modules/animation-utils";
import { createBulletTrail } from "./bullet-trail";
import { sounds } from "shared/modules/sounds/sounds";

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
	private attackSound: Sound;

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

		this.attackSound = createSound(sounds.pistol_fire, { volume: 0.2, parent: model.humanoidRootPart });
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

		if (this.attackAnimationFlag) {
			createBulletTrail(
				this.getModel().rightArm.pistol.tipAttachment.WorldPosition,
				this.getPositionWithTowerRootY(towardsPosition),
			);
		} else {
			createBulletTrail(
				this.getModel().leftArm.pistol.tipAttachment.WorldPosition,
				this.getPositionWithTowerRootY(towardsPosition),
			);
		}

		const currentAnimationTrack = this.getCurrentAttackAnimationTrack();
		currentAnimationTrack.Play();

		this.attackSound.Play();

		this.toggleAttackAnimationFlag();
	}
}
