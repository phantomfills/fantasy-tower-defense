import { Service, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { producer } from "server/store";
import { Attack } from "shared/modules/attack";
import { getAttacks } from "shared/store/attack";
import { Enemy, getEnemies } from "shared/store/enemy";

function getAttackId(_: Attack, id: string) {
	return id;
}

function getEnemyId(_: Enemy, id: string) {
	return id;
}

@Service({})
export class AttackService implements OnStart {
	onStart() {
		producer.observe(getAttacks, getAttackId, ({ enemyId, damage }) => {
			producer.dealDamageToEnemy(enemyId, damage);
		});

		producer.observe(getEnemies, getEnemyId, (_, id) => {
			return () => {
				producer.removeAttacksAssociatedWithEnemy(id);
			};
		});
	}
}
