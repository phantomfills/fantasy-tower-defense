import { ClientTower } from "../client-tower";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { DummyDefectPistolModel } from "./dummy-defect-model";
import { createBulletTrail } from "./bullet-trail";
import { createAnimationTrack } from "client/modules/animation-utils";

export class ClientDummyDefect3 extends ClientTower<DummyDefectPistolModel> {
	private animator: Animator;
	private attackAnimationTrack: AnimationTrack;
	private attackSound: Sound;

	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 3);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyDefectModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = createAnimationTrack({
			id: "rbxassetid://16995618427",
			parent: this.animator,
			animator: this.animator,
		});
		idle.Play();

		const attack = createAnimationTrack({
			id: "rbxassetid://16995667475",
			parent: this.animator,
			animator: this.animator,
		});
		this.attackAnimationTrack = attack;

		this.attackSound = createSound(sounds.pistol_fire, { volume: 0.2, parent: this.getModel().humanoidRootPart });
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
