import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { getEnemyId, selectEnemies, selectEnemyIsDead } from "shared/store/enemy";
import { selectStartingMoney } from "shared/store/level";

function initializeMoney(userId: string) {
	const startingMoney = producer.getState(selectStartingMoney);
	producer.initializeMoney(userId, startingMoney);
}

@Service({})
export class MoneyService implements OnStart {
	onStart() {
		producer.observe(selectEnemies, getEnemyId, ({ enemyType }, id) => {
			const { money } = describeEnemyFromType(enemyType);

			const unsubscribe = producer.subscribe(selectEnemyIsDead(id), (isDead) => {
				if (!isDead) return;

				producer.awardBonusToAll(money);
				unsubscribe();
			});

			return () => {
				unsubscribe();
			};
		});

		Players.GetPlayers().forEach((player) => {
			initializeMoney(tostring(player.UserId));
		});

		Players.PlayerAdded.Connect((player) => {
			initializeMoney(tostring(player.UserId));
		});
	}
}
