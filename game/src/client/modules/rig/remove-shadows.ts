export function removeShadows(rig: Model) {
	rig.GetDescendants().forEach((instance) => {
		if (!instance.IsA("BasePart")) return;
		instance.CastShadow = false;
	});
}
