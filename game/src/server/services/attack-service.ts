import { Service, OnStart } from "@flamework/core";
import { enemyAttack, towerAttack } from "server/events";
import { Events } from "server/network";
import { producer } from "server/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { towerDoesNotExistFromId } from "shared/store/tower";

@Service({})
export class AttackService implements OnStart {
	onStart() {
		enemyAttack.Connect((attack) => {
			const currentTime = getCurrentTimeInMilliseconds();

			const { towerId, enemyId, damage, attackType } = attack;

			switch (attackType) {
				case "BOULDER_THROW": {
					producer.addPause(enemyId, {
						startTime: currentTime,
						pauseFor: 2000,
					});
					Events.enemyAttack.broadcast(attack);

					task.wait(3);

					const towerDoesNotExist = producer.getState(towerDoesNotExistFromId(towerId));
					if (towerDoesNotExist) return;

					producer.damageTower(towerId, damage);
				}
			}
		});

		towerAttack.Connect((attack) => {
			const { enemyId, damage } = attack;
			producer.dealDamageToEnemy(enemyId, damage);
			Events.towerAttack.broadcast(attack);
		});
	}
}
