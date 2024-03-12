import { Service, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { producer } from "server/store";
import { getAttacks } from "shared/store/attack";
import { getEnemies } from "shared/store/enemy";

@Service({})
export class AttackService implements OnStart {
	onStart() {
		producer.observe(getAttacks, ({ enemyId, damage }) => {
			producer.dealDamageToEnemy(enemyId, damage);
		});

		producer.subscribe(getEnemies, (currentEnemies, previousEnemies) => {
			Object.keys(previousEnemies).forEach((id) => {
				if (currentEnemies[id] === undefined) {
					producer.removeAttacksAssociatedWithEnemy(id);
				}
			});
		});
	}
}
