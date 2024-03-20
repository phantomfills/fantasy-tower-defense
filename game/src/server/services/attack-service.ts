import { Service, OnStart } from "@flamework/core";
import { towerAttack } from "server/events";
import { Events } from "server/network";
import { producer } from "server/store";

@Service({})
export class AttackService implements OnStart {
	onStart() {
		towerAttack.Connect((attack) => {
			const { enemyId, damage } = attack;
			producer.dealDamageToEnemy(enemyId, damage);
			Events.towerAttack.broadcast(attack);
		});
	}
}
