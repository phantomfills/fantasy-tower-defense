import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";

const STARTING_CASH = 25000;

function initializeMoney(userId: string, amount: number) {
	producer.initializeMoney(userId, amount);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach((player) => {
			initializeMoney(tostring(player.UserId), STARTING_CASH);
		});

		Players.PlayerAdded.Connect((player) => {
			initializeMoney(tostring(player.UserId), STARTING_CASH);
		});
	}
}
