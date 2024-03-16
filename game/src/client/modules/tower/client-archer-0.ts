import { getTowerModelFromTypeAndLevel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientTower, TowerModel } from "./client-tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

interface ArcherModel extends TowerModel {
	rightArm: BasePart & {
		bow: BasePart & {
			bottomBeam: Beam;
			topBeam: Beam;
			middle: Attachment;
		};
	};
	leftArm: BasePart & {
		bowDrawAttachment: Attachment;
	};
}

export class ClientArcher0 extends ClientTower<ArcherModel> {
	private readonly animator: Animator;
	private readonly idleAnimationTrack: AnimationTrack;
	private readonly attackAnimationTrack: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModelFromTypeAndLevel("ARCHER", 0);
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = archerModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.playAnimation("rbxassetid://16590249418");
		this.idleAnimationTrack = idle;

		const attack = this.playAnimation("rbxassetid://16590396309");
		this.attackAnimationTrack = attack;

		this.connectBeamsToLeftArm();
	}

	private playAnimation(animationId: string) {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		animation.Parent = this.animator;

		const track = this.animator.LoadAnimation(animation);
		track.Play();

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

		this.attackAnimationTrack.Stopped.Connect(() => {
			this.idleAnimationTrack.Play();
			this.connectBeamsToLeftArm();
		});
	}
}
