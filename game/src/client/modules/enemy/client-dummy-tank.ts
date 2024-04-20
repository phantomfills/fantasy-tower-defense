import { ClientEnemy, EnemyModel } from "./client-enemy";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./particles";
import { playDummyPopSound } from "./dummy-pop-sound";
import { playBoulderAnimation } from "./boulder-animation";
import { holdFor } from "shared/modules/utils/wait-util";

export interface ThrowBoulder {
	throwBoulder(position: Vector3): void;
}

interface DummyTankModel extends EnemyModel {
	rightArm: BasePart & {
		boulder: BasePart;
		boulderAttachment: Attachment;
	};
}

export class ClientDummyTank extends ClientEnemy<DummyTankModel> implements ThrowBoulder {
	private readonly walkAnimation: AnimationTrack;
	private readonly retrieveAnimation: AnimationTrack;
	private readonly windUpAnimation: AnimationTrack;
	private readonly throwAnimation: AnimationTrack;

	constructor(id: string, cframe: CFrame) {
		const dummyModel = ReplicatedStorage.assets.enemies.models.dummyTank.Clone();
		dummyModel.Parent = Workspace;

		const animationController = new Instance("AnimationController");
		animationController.Parent = dummyModel;

		const animator = new Instance("Animator");
		animator.Parent = animationController;

		const walkAnimation = new Instance("Animation");
		walkAnimation.Parent = animator;
		walkAnimation.AnimationId = "rbxassetid://16779246486";

		const retrieveAnimation = new Instance("Animation");
		retrieveAnimation.Parent = animator;
		retrieveAnimation.AnimationId = "rbxassetid://17224693246";

		const windUpAnimation = new Instance("Animation");
		windUpAnimation.Parent = animator;
		windUpAnimation.AnimationId = "rbxassetid://17224827704";

		const throwAnimation = new Instance("Animation");
		throwAnimation.Parent = animator;
		throwAnimation.AnimationId = "rbxassetid://17224863625";

		dummyModel.rightArm.boulder.Transparency = 1;

		super(dummyModel, id, cframe);

		this.walkAnimation = animator.LoadAnimation(walkAnimation);
		this.retrieveAnimation = animator.LoadAnimation(retrieveAnimation);
		this.windUpAnimation = animator.LoadAnimation(windUpAnimation);
		this.throwAnimation = animator.LoadAnimation(throwAnimation);
	}

	start() {
		this.walkAnimation.Play();

		super.start();
	}

	throwBoulder(position: Vector3) {
		this.setLocked(true);

		this.walkAnimation.Stop();
		this.retrieveAnimation.Play();

		const model = this.getModel();

		const enemyPosition = this.getTargetCFrame().Position;
		const towerPosition = position;
		const newCframe = new CFrame(enemyPosition, towerPosition);
		this.snapToCFrame(newCframe);

		this.retrieveAnimation.Stopped.Once(() => {
			model.rightArm.boulder.Transparency = 0;
			this.windUpAnimation.Play();
		});

		this.windUpAnimation.Stopped.Once(() => {
			this.throwAnimation.Play();

			(async () => {
				holdFor(200);
				model.rightArm.boulder.Transparency = 1;
				playBoulderAnimation(model.rightArm.boulderAttachment.WorldPosition, position);
			})();
		});

		this.throwAnimation.Stopped.Once(() => {
			this.setLocked(false);
			this.walkAnimation.Play();
		});
	}

	destroy(): void {
		createDeathParticles(this.getModel().humanoidRootPart.Position, 25);
		playDummyPopSound(this.getModel().humanoidRootPart.Position);

		super.destroy();
	}
}
