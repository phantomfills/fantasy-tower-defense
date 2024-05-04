import { playDummyPopSound } from "./sfx/dummy-pop-sound";
import { createPopParticles } from "./vfx/particles";

export function createBasicDummyDeathEffects(position: Vector3) {
	createPopParticles(position);
	playDummyPopSound(position);
}
