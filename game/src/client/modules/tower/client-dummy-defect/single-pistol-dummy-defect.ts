import { TowerModel } from "shared/modules/tower/tower-model";
import { ClientTower } from "../client-tower";
import { createAnimationTrack } from "client/modules/animation-utils";
import { createBulletTrail } from "./bullet-trail";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { Workspace } from "@rbxts/services";
import { getPositionWithY } from "./position-with-y";
import { createSmokeParticles } from "client/modules/enemy/shared-functionality/vfx/particles";
import { holdForPromise } from "shared/modules/utils/wait-util";

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
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 0.9, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1, parent: model.humanoidRootPart }),
			createSound(sounds.pistol_fire, { volume: 0.2, speed: 1.1, parent: model.humanoidRootPart }),
		];
	}

	attack(towardsPosition: Vector3) {
		super.attack(towardsPosition);

		const tipPosition = this.getModel().rightArm.pistol.tipAttachment.WorldPosition;
		createBulletTrail(tipPosition, getPositionWithY(towardsPosition, tipPosition.Y));
		holdForPromise(175).andThenCall(createSmokeParticles, tipPosition, 3);

		this.attackAnimationTrack.Play();
		this.attackSounds[math.random(0, this.attackSounds.size() - 1)].Play();
	}
}
