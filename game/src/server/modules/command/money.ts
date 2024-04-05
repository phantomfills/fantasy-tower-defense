import { Command, Commander, CommanderType, CommandInteraction, Guard } from "@rbxts/commander";
import { producer } from "server/store";
import { isAdmin } from "shared/modules/command/admin-guard";

@Commander()
class Money {
	@Command({
		name: "giveMoney",
		description: "Gives the player money.",
		arguments: [
			{
				name: "player",
				description: "The player to give money to.",
				type: CommanderType.Player,
			},
			{
				name: "amount",
				description: "The amount of money to give.",
				type: CommanderType.Number,
			},
		],
	})
	@Guard(isAdmin)
	giveMoney(interaction: CommandInteraction, player: Player, amount: number) {
		const userId = tostring(player.UserId);
		producer.addMoney(userId, amount);

		interaction.reply(`Gave ${player.Name} ${amount} money.`);
	}
}
