import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";

const STARTING_CASH = 24100;

function initialisePlayerMoney(userId: string, amount: number) {
	producer.initializeMoney(userId, amount);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		task.wait(3);

		Players.GetPlayers().forEach((player) => {
			initialisePlayerMoney(tostring(player.UserId), STARTING_CASH);
		});

		Players.PlayerAdded.Connect((player) => {
			initialisePlayerMoney(tostring(player.UserId), STARTING_CASH);
		});
	}
}
