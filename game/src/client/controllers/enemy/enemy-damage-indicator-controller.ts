import { Controller, OnStart, OnTick } from "@flamework/core";
import { producer } from "client/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { Attack } from "shared/modules/attack";
import { getAttackId, selectAttacks } from "shared/store/tower";

@Controller({})
export class EnemyDamageIndicatorController implements OnStart, OnTick {
	onStart() {
		producer.observe(selectAttacks, getAttackId, ({ enemyPosition, damage }, id) => {
			const position = enemyPosition.add(new Vector3(0, 2.5, 0));
			producer.addDamageIndicator(id, damage, position, getCurrentTimeInMilliseconds());
		});
	}

	onTick() {
		producer.tickDamageIndicators(getCurrentTimeInMilliseconds());
	}
}
