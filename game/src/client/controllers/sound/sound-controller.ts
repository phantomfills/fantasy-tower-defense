import { Controller, OnStart } from "@flamework/core";
import { Debris } from "@rbxts/services";
import { createSound } from "client/modules/utils/sound";
import { Events } from "client/network";

@Controller({})
export class SoundController implements OnStart {
	onStart() {
		Events.playSound.connect((soundId) => {
			const sound = createSound(soundId, { volume: 0.2 });
			sound.Play();

			Debris.AddItem(sound, 10);
		});
	}
}
