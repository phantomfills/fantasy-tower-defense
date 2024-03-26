import { Service, OnStart } from "@flamework/core";
import { producer } from "server/store";
import { Enemy, selectEnemies } from "shared/store/enemy";

function getEnemyId(_: Enemy, id: string) {
	return id;
}

@Service({})
export class MapService implements OnStart {
	onStart() {
		producer.observe(selectEnemies, getEnemyId, (enemy) => {
			return () => {
				producer.deductLives(enemy.health);
			};
		});
	}
}
