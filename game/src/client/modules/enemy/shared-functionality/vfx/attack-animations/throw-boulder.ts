import { Debris, ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { EnemyModel } from "client/modules/enemy/client-enemy";
import { tags } from "shared/modules/utils/tags";
import { holdFor } from "shared/modules/utils/wait-util";

const assets = ReplicatedStorage.assets;
const boulder = assets.projectiles.boulder;

export interface ThrowsBoulder {
	throwBoulder(towerPosition: Vector3): void;
}

export interface ThrowsBoulderModel extends EnemyModel {
	rightArm: BasePart & {
		boulder: BasePart;
		boulderAttachment: Attachment;
	};
}

interface BoulderThrowAnimationProps {
	towerPosition: Vector3;
	setLocked: (locked: boolean) => void;
	snapToCframe: (cframe: CFrame) => void;
	walkAnimation: AnimationTrack;
	retrieveAnimation: AnimationTrack;
	windUpAnimation: AnimationTrack;
	throwAnimation: AnimationTrack;
	boulder: BasePart;
	boulderAttachment: Attachment;
	currentCFrame: CFrame;
}

export function playBoulderThrowAnimation({
	towerPosition,
	setLocked,
	snapToCframe,
	walkAnimation,
	retrieveAnimation,
	windUpAnimation,
	throwAnimation,
	boulder,
	boulderAttachment,
	currentCFrame,
}: BoulderThrowAnimationProps) {
	setLocked(true);

	walkAnimation.Stop();
	retrieveAnimation.Play();

	const enemyPosition = currentCFrame.Position;
	const facingTowerCframe = new CFrame(enemyPosition, towerPosition);
	snapToCframe(facingTowerCframe);

	retrieveAnimation.Stopped.Once(() => {
		boulder.Transparency = 0;
		windUpAnimation.Play();
	});

	windUpAnimation.Stopped.Once(() => {
		throwAnimation.Play();

		holdFor(200);
		boulder.Transparency = 1;
		playBoulderProjectileAnimation(boulderAttachment.WorldPosition, towerPosition);
	});

	throwAnimation.Stopped.Once(() => {
		setLocked(false);
		walkAnimation.Play();
	});
}

export function playBoulderProjectileAnimation(fromPosition: Vector3, toPosition: Vector3) {
	const newBoulder = boulder.Clone();

	newBoulder.PivotTo(new CFrame(fromPosition, toPosition));
	newBoulder.Anchored = true;
	newBoulder.Parent = Workspace;
	newBoulder.AddTag(tags.PROJECTILE);

	const boulderTweenEndProps = {
		Position: toPosition,
	};
	const boulderTweenInfo = new TweenInfo(0.2, Enum.EasingStyle.Linear);
	const boulderTween = TweenService.Create(newBoulder, boulderTweenInfo, boulderTweenEndProps);
	boulderTween.Play();

	boulderTween.Completed.Once(() => {
		newBoulder.Destroy();

		const explosion = new Instance("Part");
		explosion.Size = new Vector3(0, 0, 0);
		explosion.PivotTo(new CFrame(toPosition));
		explosion.Anchored = true;
		explosion.CanCollide = false;
		explosion.Shape = Enum.PartType.Ball;
		explosion.Material = Enum.Material.Neon;
		explosion.Transparency = 0.5;
		explosion.Parent = Workspace;
		explosion.AddTag(tags.PROJECTILE);

		const explosionTweenEndProps = {
			Size: new Vector3(8, 8, 8),
			Transparency: 1,
		};
		const explosionTweenInfo = new TweenInfo(0.35, Enum.EasingStyle.Sine, Enum.EasingDirection.Out);
		const explosionTween = TweenService.Create(explosion, explosionTweenInfo, explosionTweenEndProps);
		explosionTween.Play();

		Debris.AddItem(explosion, 1);
	});
}
