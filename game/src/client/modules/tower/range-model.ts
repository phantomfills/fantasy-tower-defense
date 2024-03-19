export function createRangeModel(range: number, position: Vector3): Model {
	const rangeIndicatorModel = new Instance("Model");

	const rangeIndicator = new Instance("Part");
	rangeIndicator.Shape = Enum.PartType.Cylinder;
	rangeIndicator.Size = new Vector3(0.1, range * 2, range * 2);
	rangeIndicator.Anchored = true;
	rangeIndicator.CanCollide = false;
	rangeIndicator.Color = Color3.fromRGB(0, 163, 255);
	rangeIndicator.Transparency = 0.5;
	rangeIndicator.CFrame = new CFrame(position).mul(CFrame.Angles(0, 0, math.rad(90)));
	rangeIndicator.CastShadow = false;
	rangeIndicator.Parent = rangeIndicatorModel;

	return rangeIndicatorModel;
}
