import { ClientTower } from "../client-tower";
import { createArrow } from "./arrow";
import { CrossbowArcherModel } from "./archer-model";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";

export class ClientCrossbowArcher extends ClientTower<CrossbowArcherModel> {
	private readonly animator: Animator;
	private readonly idleAnimationTrack: AnimationTrack;
	private readonly attackAnimationTrack: AnimationTrack;
	private readonly attackSound: Sound;
	private readonly beamColor?: Color3;

	constructor(id: string, cframe: CFrame, model: CrossbowArcherModel, beamColor?: Color3) {
		super(model, id, cframe);

		this.beamColor = beamColor;

		const animationController = new Instance("AnimationController");
		animationController.Parent = model;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.getAnimationTrack("rbxassetid://16818787151");
		idle.Play();
		this.idleAnimationTrack = idle;

		const attack = this.getAnimationTrack("rbxassetid://16818825464");
		this.attackAnimationTrack = attack;

		this.attackSound = createSound(sounds.crossbow_fire, { volume: 0.2, parent: this.getModel().humanoidRootPart });
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

		this.idleAnimationTrack.Stop();
		this.attackAnimationTrack.Play();

		createArrow(
			this.getModel().rightArm.crossbow.Position,
			this.getPositionWithTowerRootY(towardsPosition),
			this.beamColor,
		);

		this.attackSound.Play();

		this.attackAnimationTrack.Stopped.Once(() => {
			this.idleAnimationTrack.Play();
		});
	}
}
