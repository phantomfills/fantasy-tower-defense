import { SoundService } from "@rbxts/services";

interface SoundOptions {
	volume?: number;
	speed?: number;
	looped?: boolean;
	parent?: Instance;
}

export function createSound(
	soundId: string,
	{ volume = 0.5, speed = 1, looped = false, parent = SoundService }: SoundOptions = {},
) {
	const sound = new Instance("Sound");

	sound.SoundId = soundId;
	sound.Volume = volume;
	sound.PlaybackSpeed = speed;
	sound.Looped = looped;
	sound.Parent = parent;
	sound.RollOffMinDistance = 10;
	sound.RollOffMaxDistance = 10_000;

	return sound;
}
