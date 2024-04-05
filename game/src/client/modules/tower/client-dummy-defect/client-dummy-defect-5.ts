import { ClientTower } from "../client-tower";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { DummyDefectDualPistolModel } from "./dummy-defect-model";
import { createBulletTrail } from "./bullet-trail";

export class ClientDummyDefect5 extends ClientTower<DummyDefectDualPistolModel> {
	private animator: Animator;
	private attackAnimationTrack1: AnimationTrack;
	private attackAnimationTrack2: AnimationTrack;
	private attackAnimationFlag: boolean;
	private attackSound: Sound;

	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 5);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyDefectModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.getAnimationTrack("rbxassetid://16995791208");
		idle.Play();

		const attack1 = this.getAnimationTrack("rbxassetid://16995813016");
		this.attackAnimationTrack1 = attack1;

		const attack2 = this.getAnimationTrack("rbxassetid://16995826343");
		this.attackAnimationTrack2 = attack2;

		this.attackAnimationFlag = false;

		this.attackSound = createSound(sounds.pistol_fire, { volume: 0.2, parent: this.getModel().humanoidRootPart });
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

	private getAnimationTrack(animationId: string) {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		animation.Parent = this.animator;

		const track = this.animator.LoadAnimation(animation);

		return track;
	}

	attack(towardsPosition: Vector3): void {
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
