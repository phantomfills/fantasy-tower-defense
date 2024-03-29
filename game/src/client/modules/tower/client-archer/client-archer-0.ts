import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientTower } from "../client-tower";
import { Workspace } from "@rbxts/services";
import { createArrow } from "./arrow";
import { BowArcherModel } from "./archer-model";

export class ClientArcher0 extends ClientTower<BowArcherModel> {
	private readonly animator: Animator;
	private readonly idleAnimationTrack: AnimationTrack;
	private readonly attackAnimationTrack: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModel("ARCHER", 0);
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = archerModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.getAnimationTrack("rbxassetid://16590249418");
		idle.Play();
		this.idleAnimationTrack = idle;

		const attack = this.getAnimationTrack("rbxassetid://16590396309");
		this.attackAnimationTrack = attack;

		this.connectBeamsToLeftArm();
	}

	private getAnimationTrack(animationId: string) {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		animation.Parent = this.animator;

		const track = this.animator.LoadAnimation(animation);

		return track;
	}

	private connectBeamsToBow() {
		const model = this.getModel();

		const bottomBeam = model.rightArm.bow.bottomBeam;
		const topBeam = model.rightArm.bow.topBeam;

		const middle = model.rightArm.bow.middle;

		bottomBeam.Attachment1 = middle;
		topBeam.Attachment0 = middle;
	}

	private connectBeamsToLeftArm() {
		const model = this.getModel();

		const bottomBeam = model.rightArm.bow.bottomBeam;
		const topBeam = model.rightArm.bow.topBeam;

		const drawAttachment = model.leftArm.bowDrawAttachment;

		bottomBeam.Attachment1 = drawAttachment;
		topBeam.Attachment0 = drawAttachment;
	}

	attack(towardsPosition: Vector3): void {
		super.attack(towardsPosition);

		this.idleAnimationTrack.Stop();
		this.attackAnimationTrack.Play();

		this.connectBeamsToBow();

		createArrow(this.getModel().rightArm.bow.middle.WorldPosition, this.getPositionWithTowerRootY(towardsPosition));

		this.attackAnimationTrack.Stopped.Once(() => {
			this.idleAnimationTrack.Play();
			this.connectBeamsToLeftArm();
		});
	}
}
