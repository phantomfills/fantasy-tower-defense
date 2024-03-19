import { Service, OnStart } from "@flamework/core";
import { producer } from "server/store";
import { getAttackId, selectAttacks } from "shared/store/tower";

@Service({})
export class AttackService implements OnStart {
	onStart() {
		producer.observe(selectAttacks, getAttackId, ({ enemyId, damage }) => {
			producer.dealDamageToEnemy(enemyId, damage);
		});
	}
}
