import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { producer } from "client/store";
import { describeEnemyAttackFromType } from "shared/modules/enemy/enemy-attack-to-config-map";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { selectTowerPosition } from "shared/store/tower";

@Controller({})
export class TowerDamageIndicatorController implements OnStart {
	onStart() {
		Events.enemyAttack.connect(({ towerId, damage, attackType }) => {
			const possibleTowerPosition = producer.getState(selectTowerPosition(towerId));
			if (!possibleTowerPosition.exists) return;

			const attackProps = describeEnemyAttackFromType(attackType);
			const delay = attackProps.delay ?? 0;

			holdFor(delay);

			const towerPosition = possibleTowerPosition.value;
			const damageIndicatorPosition = towerPosition.add(new Vector3(0, 2.5, 0));
			producer.addDamageIndicator(createId(), damage, damageIndicatorPosition, getCurrentTimeInMilliseconds());
		});
	}
}
