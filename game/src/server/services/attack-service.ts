import { Service, OnStart } from "@flamework/core";
import { attackTower, attackEnemy } from "server/events";
import { Events } from "server/network";
import { producer } from "server/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { holdFor } from "shared/modules/utils/wait-util";
import { towerDoesNotExistFromId } from "shared/store/tower";

@Service({})
export class AttackService implements OnStart {
	onStart() {
		attackTower.Connect((attack) => {
			const currentTime = getCurrentTimeInMilliseconds();

			const { towerId, enemyId, damage, attackType } = attack;

			switch (attackType) {
				case "BOULDER_THROW": {
					producer.addPause(enemyId, {
						startTime: currentTime,
						pauseFor: 2000,
					});
					Events.enemyAttack.broadcast(attack);

					holdFor(2500);

					const towerDoesNotExist = producer.getState(towerDoesNotExistFromId(towerId));
					if (towerDoesNotExist) return;

					producer.damageTower(towerId, damage);
				}
			}
		});

		attackEnemy.Connect((attack) => {
			const { enemyId, damage } = attack;
			producer.dealDamageToEnemy(enemyId, damage);
			Events.towerAttack.broadcast(attack);
		});
	}
}
