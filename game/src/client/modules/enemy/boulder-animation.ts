import { Debris, ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { createDeathParticles } from "./particles";
import { playDummyPopSound } from "./dummy-pop-sound";
import { tags } from "shared/modules/utils/tags";

const assets = ReplicatedStorage.assets;
const boulder = assets.projectiles.boulder;

export function playBoulderAnimation(fromPosition: Vector3, toPosition: Vector3) {
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
