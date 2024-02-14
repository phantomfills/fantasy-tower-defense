import { ClientTower, TowerModel } from "./client-tower";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

export interface ArcherModel extends TowerModel {
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

export class ClientArcher extends ClientTower<ArcherModel> {
	private readonly animator: Animator;

	constructor(id: string, cframe: CFrame) {
		const archerModel = ReplicatedStorage.assets.towers.archer.models.archer.Clone();
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = archerModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idleAnimation = new Instance("Animation");
		idleAnimation.Parent = this.animator;
		idleAnimation.AnimationId = "rbxassetid://16353521197";

		const animation = this.animator.LoadAnimation(idleAnimation);
		animation.Play();

		this.connectBeamsToBow();
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

		this.connectBeamsToLeftArm();

		print("Playing draw animations");

		const drawAnimation = new Instance("Animation");
		drawAnimation.AnimationId = "rbxassetid://16354051163";
		drawAnimation.Parent = this.animator;

		const draw = this.animator.LoadAnimation(drawAnimation);
		draw.Play();

		draw.Stopped.Connect(() => {
			print("Drawing animation ended, playing attack animation");

			this.connectBeamsToBow();

			const attackAnimation = new Instance("Animation");
			attackAnimation.AnimationId = "rbxassetid://16354188344";
			attackAnimation.Parent = this.animator;

			const attack = this.animator.LoadAnimation(attackAnimation);
			attack.Play();
		});
	}
}
