import { CollectionService, Debris, TweenService, Workspace } from "@rbxts/services";
import { tags } from "shared/modules/utils/tags";

export function createArrow(fromPosition: Vector3, toPosition: Vector3, color?: Color3) {
	const distance = fromPosition.sub(toPosition).Magnitude;
	const offset = new CFrame(0, 0, -distance / 2);

	const arrow = new Instance("Part");
	arrow.Color = color || Color3.fromRGB(255, 255, 255);
	arrow.Size = new Vector3(0.1, 0.1, distance);
	arrow.Material = Enum.Material.Neon;
	arrow.Anchored = true;
	arrow.CanCollide = false;
	arrow.Transparency = 0.25;
	arrow.PivotTo(new CFrame(fromPosition, toPosition).mul(offset));
	arrow.Parent = Workspace.CurrentCamera;

	CollectionService.AddTag(arrow, tags.PROJECTILE);

	const arrowTransparencyTweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.Out);
	const arrowTransparencyTweenEndProps = {
		Transparency: 1,
	};
	const arrowTransparencyTween = TweenService.Create(
		arrow,
		arrowTransparencyTweenInfo,
		arrowTransparencyTweenEndProps,
	);
	arrowTransparencyTween.Play();

	Debris.AddItem(arrow, 2);
}
