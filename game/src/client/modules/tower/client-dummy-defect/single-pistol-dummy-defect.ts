import { TowerModel } from "shared/modules/tower/tower-model";
import { ClientTower } from "../client-tower";
import { createAnimationTrack } from "client/modules/animation-utils";
import { createBulletTrail } from "./bullet-trail";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Workspace } from "@rbxts/services";

export interface DummyDefectPistolModel extends TowerModel {
	rightArm: BasePart & {
		pistol: {
			tipAttachment: Attachment;
		};
	};
}

export class SinglePistolDummyDefect extends ClientTower<DummyDefectPistolModel> {
	private attackAnimationTrack: AnimationTrack;
	private attackSounds: Sound[];

	constructor(model: DummyDefectPistolModel, id: string, cframe: CFrame) {
		super(model, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = model;

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

		this.attackSounds = [
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1.35, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1.5, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1.65, parent: model.humanoidRootPart }),
		];
	}

	attack(towardsPosition: Vector3) {
		super.attack(towardsPosition);

		createBulletTrail(
			this.getModel().rightArm.pistol.tipAttachment.WorldPosition,
			this.getPositionWithTowerRootY(towardsPosition),
		);

		this.attackAnimationTrack.Play();
		this.attackSounds[math.random(0, this.attackSounds.size() - 1)].Play();
	}
}
