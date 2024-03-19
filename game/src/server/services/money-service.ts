import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";
import { getPossibleTowerFromId, selectAttacks } from "shared/store/tower";

const STARTING_CASH = 2_000;

function initializeMoney(userId: string, amount: number) {
	producer.initializeMoney(userId, amount);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		producer.observe(selectAttacks, (attack) => {
			const { towerId, damage } = attack;

			const possibleTower = producer.getState(getPossibleTowerFromId(towerId));
			if (!possibleTower.exists) return;

			const tower = possibleTower.value;
			const { owner } = tower;

			producer.addMoney(owner, damage);
		});

		Players.GetPlayers().forEach((player) => {
			initializeMoney(tostring(player.UserId), STARTING_CASH);
		});

		Players.PlayerAdded.Connect((player) => {
			initializeMoney(tostring(player.UserId), STARTING_CASH);
		});
	}
}
