import { Command, Commander, CommanderType, CommandInteraction, Guard } from "@rbxts/commander";
import { producer } from "server/store";
import { isAdmin } from "shared/modules/command/admin-guard";

@Commander()
class Lives {
	@Command({
		name: "incrementLives",
		description: "Increments the number of lives.",
		arguments: [
			{
				name: "lives",
				description: "The number of lives to increment.",
				type: CommanderType.Number,
			},
		],
	})
	@Guard(isAdmin)
	incrementLives(interaction: CommandInteraction, lives: number) {
		producer.incrementLives(lives);

		interaction.reply(`Set lives to ${lives}.`);
	}
}
