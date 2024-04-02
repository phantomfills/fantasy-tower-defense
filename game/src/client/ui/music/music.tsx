import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectTrackId } from "shared/store/music";
import { createSound } from "client/modules/utils/sound";

export function Music() {
	const trackId = useSelector(selectTrackId);
	const [sound, setSound] = useState<Sound>();

	useEffect(() => {
		if (trackId === undefined) return;

		const newSound = createSound(trackId, { volume: 0.2, looped: true });
		setSound(newSound);

		return () => {
			newSound.Destroy();
		};
	}, [trackId]);

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
