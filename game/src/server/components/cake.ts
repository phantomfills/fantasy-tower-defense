import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { tags } from "shared/modules/utils/tags";
import { possible } from "shared/modules/utils/possible";
import { Debris } from "@rbxts/services";
import { Events } from "server/network";
import { sounds } from "shared/modules/sounds/sounds";
import { producer } from "server/store";

interface CakeInstance extends Instance {}

@Component({
	tag: tags.CAKE,
})
export class Cake extends BaseComponent<{}, CakeInstance> implements OnStart {
	private prompt: ProximityPrompt;
	private playersEaten: Record<string, boolean>;

	constructor() {
		super();

		const prompt = new Instance("ProximityPrompt");
		prompt.ObjectText = "Delicious Dessert";
		prompt.ActionText = "Devour Destructively";
		prompt.HoldDuration = 2;
		prompt.KeyboardKeyCode = Enum.KeyCode.E;
		prompt.Parent = this.instance;

		this.prompt = prompt;
		this.playersEaten = {};
	}

	private getPlayerHasEaten(player: Player) {
		const userId = tostring(player.UserId);
		return this.playersEaten[userId] ?? false;
	}

	private setPlayerHasEaten(player: Player, value: boolean) {
		const userId = tostring(player.UserId);
		this.playersEaten[userId] = value;
	}

	onStart() {
		this.prompt.Triggered.Connect((player) => {
			const playerHasEaten = this.getPlayerHasEaten(player);
			if (playerHasEaten) return;

			this.setPlayerHasEaten(player, true);

			const userId = tostring(player.UserId);
			producer.addMoney(userId, 1_000);

			const possibleCharacter = possible<Model>(player.Character);
			if (!possibleCharacter.exists) return;

			const character = possibleCharacter.value;

			const possiblePrimaryPart = possible<BasePart>(character.PrimaryPart);
			if (!possiblePrimaryPart.exists) return;

			producer.completeObjectiveForPlayer(userId, "EAT_CAKE");

			const primaryPart = possiblePrimaryPart.value;

			const explosion = new Instance("Explosion");
			explosion.Position = primaryPart.Position;
			explosion.Parent = primaryPart.Parent;

			Debris.AddItem(explosion, 2);

			Events.playSound.broadcast(sounds.scream);
		});
	}
}
