import { sounds } from "shared/modules/sounds/sounds";
import { createSound } from "../utils/sound";
import { Debris, Workspace } from "@rbxts/services";

export function playDummyPopSound(position: Vector3) {
	const dummyPopSoundPart = new Instance("Part");
	dummyPopSoundPart.Position = position;
	dummyPopSoundPart.Anchored = true;
	dummyPopSoundPart.CanCollide = false;
	dummyPopSoundPart.Transparency = 1;
	dummyPopSoundPart.Size = new Vector3(1, 1, 1);
	dummyPopSoundPart.Parent = Workspace;

	const dummyPopSound = createSound(sounds.dummy_pop, { volume: 0.2, parent: dummyPopSoundPart });
	dummyPopSound.Play();

	Debris.AddItem(dummyPopSoundPart, 10);
}
