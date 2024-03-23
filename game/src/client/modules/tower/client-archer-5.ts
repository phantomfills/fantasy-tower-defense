import { getTowerModel } from "shared/modules/tower/tower-type-to-model-map";
import { ClientTower, TowerModel } from "./client-tower";
import { Workspace } from "@rbxts/services";

export class ClientArcher5 extends ClientTower<TowerModel> {
	private readonly animator: Animator;
	private readonly idleAnimationTrack: AnimationTrack;
	private readonly attackAnimationTrack: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const archerModel = getTowerModel("ARCHER", 5);
		archerModel.Parent = Workspace;
		super(archerModel, id, cframe);

		const animationController = new Instance("AnimationController");
		animationController.Parent = archerModel;

		this.animator = new Instance("Animator");
		this.animator.Name = "animator";
		this.animator.Parent = animationController;

		const idle = this.getAnimationTrack("rbxassetid://16818787151");
		idle.Play();
		this.idleAnimationTrack = idle;

		const attack = this.getAnimationTrack("rbxassetid://16818825464");
		this.attackAnimationTrack = attack;
	}

	private getAnimationTrack(animationId: string) {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		animation.Parent = this.animator;

		const track = this.animator.LoadAnimation(animation);

		return track;
	}

	attack(towardsPosition: Vector3): void {
		super.attack(towardsPosition);

		this.idleAnimationTrack.Stop();

		this.attackAnimationTrack.Play();

		this.attackAnimationTrack.Stopped.Once(() => {
			this.idleAnimationTrack.Play();
		});
	}
}
