import { Controller, OnStart, OnTick } from "@flamework/core";
import { Events } from "client/network";
import { producer } from "client/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";

@Controller({})
export class EnemyDamageIndicatorController implements OnStart, OnTick {
	onStart() {
		Events.towerAttack.connect(({ enemyPosition, damage }) => {
			const position = enemyPosition.add(new Vector3(0, 2.5, 0));
			producer.addDamageIndicator(createId(), damage, position, getCurrentTimeInMilliseconds());
		});
	}

	onTick() {
		producer.tickDamageIndicators(getCurrentTimeInMilliseconds());
	}
}
