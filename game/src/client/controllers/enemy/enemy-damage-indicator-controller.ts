import { Controller, OnStart, OnTick } from "@flamework/core";
import { producer } from "client/store";
import { getAttacks } from "shared/store/attack";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

@Controller({})
export class EnemyDamageIndicatorController implements OnStart, OnTick {
	onStart() {
		producer.observe(getAttacks, ({ enemyPosition, damage }, id) => {
			const position = enemyPosition.add(new Vector3(0, 2.5, 0));
			producer.addDamageIndicator(id, damage, position, getCurrentTimeInMilliseconds());
		});
	}

	onTick() {
		producer.tickDamageIndicators(getCurrentTimeInMilliseconds());
	}
}
