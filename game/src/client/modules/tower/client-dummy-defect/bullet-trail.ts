import { CollectionService, Debris, TweenService, Workspace } from "@rbxts/services";
import { tags } from "shared/modules/utils/tags";
import { holdFor } from "shared/modules/utils/wait-util";

const BULLET_ANIMATION_DURATION = 100;

export function createBulletTrail(fromPosition: Vector3, toPosition: Vector3) {
	const bulletTrail = new Instance("Part");
	bulletTrail.Color = Color3.fromRGB(255, 255, 0);
	bulletTrail.Size = new Vector3(0.05, 0.05, 0.05);
	bulletTrail.Material = Enum.Material.Neon;
	bulletTrail.Anchored = true;
	bulletTrail.CanCollide = false;
	bulletTrail.Transparency = 0.5;
	bulletTrail.PivotTo(new CFrame(fromPosition, toPosition));
	bulletTrail.Parent = Workspace.CurrentCamera;

	const attachment0 = new Instance("Attachment");
	attachment0.Position = new Vector3(0, 0.03, 0);
	attachment0.Parent = bulletTrail;

	const attachment1 = new Instance("Attachment");
	attachment1.Position = new Vector3(0, -0.03, 0);
	attachment1.Parent = bulletTrail;

	const trail = new Instance("Trail");
	trail.Attachment0 = attachment0;
	trail.Attachment1 = attachment1;
	trail.LightEmission = 1;
	trail.Color = new ColorSequence(Color3.fromRGB(255, 255, 0));
	trail.Lifetime = 0.025;
	trail.Transparency = new NumberSequence([new NumberSequenceKeypoint(0, 0), new NumberSequenceKeypoint(1, 1)]);
	trail.Parent = bulletTrail;

	holdFor(25);

	const bulletTween = TweenService.Create(bulletTrail, new TweenInfo(BULLET_ANIMATION_DURATION / 1000), {
		Position: toPosition,
	});
	bulletTween.Play();

	CollectionService.AddTag(bulletTrail, tags.PROJECTILE);

	Debris.AddItem(bulletTrail, BULLET_ANIMATION_DURATION / 1000);
}
