import { CollectionService, Debris, Workspace } from "@rbxts/services";
import { tags } from "shared/modules/utils/tags";

export function createBulletTrail(fromPosition: Vector3, toPosition: Vector3) {
	const distance = fromPosition.sub(toPosition).Magnitude;
	const offset = new CFrame(0, 0, -distance / 2);

	const bulletTrail = new Instance("Part");
	bulletTrail.Color = Color3.fromRGB(255, 255, 0);
	bulletTrail.Size = new Vector3(0.025, 0.025, distance);
	bulletTrail.Material = Enum.Material.Neon;
	bulletTrail.Anchored = true;
	bulletTrail.CanCollide = false;
	bulletTrail.Transparency = 0.5;
	bulletTrail.PivotTo(new CFrame(fromPosition, toPosition).mul(offset));
	bulletTrail.Parent = Workspace.CurrentCamera;

	CollectionService.AddTag(bulletTrail, tags.PROJECTILE);

	Debris.AddItem(bulletTrail, 0.1);
}
