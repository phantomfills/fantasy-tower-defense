import { ClientTower } from "../client-tower";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { DummyDefectPistolModel } from "./dummy-defect-model";
import { createBulletTrail } from "./bullet-trail";
import { createAnimationTrack } from "client/modules/animation-utils";

export class ClientDummyDefect2 extends ClientTower<DummyDefectPistolModel> {
	private attackAnimationTrack: AnimationTrack;
	private attackSound: Sound;

	constructor(id: string, cframe: CFrame) {
		const dummyDefectModel = getTowerModel("DUMMY_DEFECT", 2);
		dummyDefectModel.Parent = Workspace;
		super(dummyDefectModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyDefectModel;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const idle = createAnimationTrack({
			id: "rbxassetid://16995618427",
			parent: animator,
			animator,
		});
		idle.Play();

		const attack = createAnimationTrack({
			id: "rbxassetid://16995667475",
			parent: animator,
			animator,
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
