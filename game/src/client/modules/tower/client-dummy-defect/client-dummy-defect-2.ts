import { ClientTower } from "../client-tower";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { DummyDefectPistolModel } from "./dummy-defect-model";
import { createBulletTrail } from "./bullet-trail";

export class ClientDummyDefect2 extends ClientTower<DummyDefectPistolModel> {
	private animator: Animator;
	private attackAnimationTrack: AnimationTrack;
	private attackSound: Sound;

	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 2);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyDefectModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.getAnimationTrack("rbxassetid://16995618427");
		idle.Play();

		const attack = this.getAnimationTrack("rbxassetid://16995667475");
		this.attackAnimationTrack = attack;

		this.attackSound = createSound(sounds.pistol_fire, { volume: 0.2, parent: this.getModel().humanoidRootPart });
	}

	private getAnimationTrack(animationId: string) {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		animation.Parent = this.animator;

		const track = this.animator.LoadAnimation(animation);

		return track;
	}

	attack(towardsPosition: Vector3) {
		super.attack(towardsPosition);

		createBulletTrail(
			this.getModel().rightArm.pistol.tipAttachment.WorldPosition,
			this.getPositionWithTowerRootY(towardsPosition),
		);

		this.attackAnimationTrack.Play();
		this.attackSound.Play();
	}
}
