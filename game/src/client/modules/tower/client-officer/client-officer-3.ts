import { TowerModel } from "shared/modules/tower/tower-model";
import { ClientTower } from "../client-tower";
import { createAnimationTrack } from "client/modules/animation-utils";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { createSmokeParticles } from "client/modules/enemy/shared-functionality/vfx/particles";
import { holdForPromise } from "shared/modules/utils/wait-util";
import { getPositionWithY } from "../client-dummy-defect/position-with-y";
import { createBulletTrail } from "../client-dummy-defect/bullet-trail";
import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { Workspace } from "@rbxts/services";

interface OfficerModel extends TowerModel {
	appearance: Folder & {
		gun: BasePart & {
			tipAttachment: Attachment;
		};
	};
}

export class ClientOfficer3 extends ClientTower<OfficerModel> {
	private attackAnimationTrack: AnimationTrack;
	private attackSounds: Sound[];

	constructor(id: string, cframe: CFrame) {
		const model = getTowerModel("OFFICER", 3);
		model.Parent = Workspace;

		super(model, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = model;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const idle = createAnimationTrack({
			id: "rbxassetid://81298554694785",
			parent: animator,
			animator,
		});
		idle.Play();

		const attack = createAnimationTrack({
			id: "rbxassetid://139913194809306",
			parent: animator,
			animator,
		});
		this.attackAnimationTrack = attack;

		this.attackSounds = [
			createSound(sounds.shotgun_fire, { volume: 0.2, speed: 0.9, parent: model.humanoidRootPart }),
			createSound(sounds.shotgun_fire, { volume: 0.2, speed: 1, parent: model.humanoidRootPart }),
			createSound(sounds.shotgun_fire, { volume: 0.2, speed: 1.1, parent: model.humanoidRootPart }),
		];
	}

	attack(towardsPosition: Vector3) {
		super.attack(towardsPosition);

		const tipPosition = this.getModel().appearance.gun.tipAttachment.WorldPosition;
		createBulletTrail(tipPosition, getPositionWithY(towardsPosition, tipPosition.Y));
		holdForPromise(175).andThenCall(createSmokeParticles, tipPosition, 3);

		this.attackAnimationTrack.Play();
		this.attackSounds[math.random(0, this.attackSounds.size() - 1)].Play();
	}
}
