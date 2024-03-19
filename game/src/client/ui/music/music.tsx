import Roact from "@rbxts/roact";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useEffect, useState } from "@rbxts/roact";
import { SoundService } from "@rbxts/services";

const MUSIC = [
	"rbxassetid://1844422218",
	"rbxassetid://1842559618",
	"rbxassetid://1838673350",
	"rbxassetid://1839857296",
	"rbxassetid://9048378262",
];

function shuffle<T extends defined>(array: T[]): T[] {
	const result = table.clone(array);
	const random = new Random();

	for (const index of $range(result.size() - 1, 1, -1)) {
		const randomIndex = random.NextInteger(0, index);
		const temp = result[index];
		result[index] = result[randomIndex];
		result[randomIndex] = temp;
	}

	return result;
}

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
	const [queue, setQueue] = useState(() => shuffle(MUSIC));
	const [index, setIndex] = useState(0);
	const [sound, setSound] = useState<Sound>();

	useEventListener(sound?.Ended, () => {
		setIndex(index + 1);
	});

	useEffect(() => {
		if (index >= queue.size()) {
			setQueue(shuffle(MUSIC));
			setIndex(0);
			return;
		}

		const newSound = createSound(queue[index], { volume: 0.2 });

		setSound(newSound);

		return () => {
			newSound.Destroy();
		};
	}, [index]);

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
