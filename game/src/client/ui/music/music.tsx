import Roact, { useEffect, useState } from "@rbxts/roact";
import { SoundService } from "@rbxts/services";
import { useSelector } from "@rbxts/react-reflex";
import { selectPossibleTrackId } from "shared/store/music";

interface SoundOptions {
	volume?: number;
	speed?: number;
	looped?: boolean;
	parent?: Instance;
}

function createSound(
	soundId: string,
	{ volume = 0.5, speed = 1, looped = false, parent = SoundService }: SoundOptions = {},
) {
	const sound = new Instance("Sound");

	sound.SoundId = soundId;
	sound.Volume = volume;
	sound.PlaybackSpeed = speed;
	sound.Looped = looped;
	sound.Parent = parent;

	return sound;
}

export function Music() {
	const possibleTrackId = useSelector(selectPossibleTrackId);
	const [sound, setSound] = useState<Sound>();

	useEffect(() => {
		if (!possibleTrackId.exists) return;
		const trackId = possibleTrackId.value;

		const newSound = createSound(trackId, { volume: 0.2, looped: true });
		setSound(newSound);

		return () => {
			newSound.Destroy();
		};
	}, [possibleTrackId]);

	useEffect(() => {
		sound?.Play();
	}, [sound]);

	useEffect(() => {
		return () => {
			sound?.Destroy();
		};
	}, [sound]);

	return <></>;
}
