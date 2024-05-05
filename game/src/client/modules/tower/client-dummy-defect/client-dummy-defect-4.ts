import { ClientTower } from "../client-tower";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { DummyDefectDualPistolModel } from "./dummy-defect-model";
import { createBulletTrail } from "./bullet-trail";
import { createAnimationTrack } from "client/modules/animation-utils";

export class ClientDummyDefect4 extends ClientTower<DummyDefectDualPistolModel> {
	private attackAnimationTrack1: AnimationTrack;
	private attackAnimationTrack2: AnimationTrack;
	private attackAnimationFlag: boolean;
	private attackSound: Sound;

	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 4);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyDefectModel;

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
