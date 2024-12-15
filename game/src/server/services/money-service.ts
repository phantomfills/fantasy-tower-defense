import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";
import { selectStartingMoney } from "shared/store/level";

function initializeMoney(userId: string) {
	const startingMoney = producer.getState(selectStartingMoney);
	producer.initializeMoney(userId, startingMoney);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach((player) => {
			initializeMoney(tostring(player.UserId));
		});

		Players.PlayerAdded.Connect((player) => {
			initializeMoney(tostring(player.UserId));
		});
	}
}
