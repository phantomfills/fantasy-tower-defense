import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { towerAttack } from "server/events";
import { producer } from "server/store";
import { getPossibleTowerFromId } from "shared/store/tower";

const STARTING_CASH = 2_000;

function initializeMoney(userId: string, amount: number) {
	producer.initializeMoney(userId, amount);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		towerAttack.Connect((attack) => {
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
