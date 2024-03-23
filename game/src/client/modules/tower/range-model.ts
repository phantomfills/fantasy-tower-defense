export function createRangeModel(range: number, position: Vector3): Model {
	const rangeIndicatorModel = new Instance("Model");

	// Humanoid is required for the highlight to work with transparency - buggy Roblox instances
	const humanoid = new Instance("Humanoid");
	humanoid.Parent = rangeIndicatorModel;

	const rangeIndicator = new Instance("Part");
	rangeIndicator.Shape = Enum.PartType.Cylinder;
	rangeIndicator.Size = new Vector3(0.1, range * 2, range * 2);
	rangeIndicator.Anchored = true;
	rangeIndicator.CanCollide = false;
	rangeIndicator.Color = Color3.fromRGB(150, 150, 150);
	rangeIndicator.Transparency = 0.5;
	rangeIndicator.CFrame = new CFrame(position).mul(CFrame.Angles(0, 0, math.rad(90)));
	rangeIndicator.CastShadow = false;
	rangeIndicator.Parent = rangeIndicatorModel;

	const highlight = new Instance("Highlight");
	highlight.OutlineColor = Color3.fromRGB(255, 255, 255);
	highlight.OutlineTransparency = 0;
	highlight.FillTransparency = 1;
	highlight.Parent = rangeIndicator;

	return rangeIndicatorModel;
}
